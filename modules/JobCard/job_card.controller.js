import { Op, Sequelize } from "sequelize";
import {
  JC_OPEN,
  JC_APPROVE,
  JC_AUTO_APPROVE,
  JC_Carry_Forward,
  JC_CLOSE,
  JC_REJECT,
  JC_PTW_TIMEOUT,
  JC_NO_CARRY_FORWARD,
  httpStatusCodes,
  moduleConstant,
} from "../../utility/constant.js";
import DB from "../../utility/connection.js";
import { insertComment, getHistoryDetails } from "../../utility/common.js";
import validator from "validator";

/* Showing Job Card List by Selecting Date */ /* Show All Job Cards Within Selected Dates */

export const jobCardDateSelectionList = async (req, res) => {
  console.log(req.body);
  const { Start_Date, End_Date } = req.body;
  console.log(Start_Date);
  console.log(End_Date);
  const startedDate = new Date(Start_Date);
  const endDate = new Date(End_Date);

  DB.JobCard.findAll({
    where: {
      [Op.and]: {
        JC_Status: 1,
        JC_Added_Date: {
          // [Op.between]: { Does not work, not supported by Sequelize
          //   startedDate,
          //   endDate,
          // },
          [Op.and]: {
            /* Alternative to above example */
            [Op.gte]: startedDate,
            [Op.lte]: endDate,
          },
        },
      },
    },
  })
    .then((result) => {
      if (result === []) {
        throw new Error("Not Found");
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get Job Card Details
export const jobCardNormal = async (req, res) => {
  const result = await DB.JobCard.findAll({
    limit: 3,
  });

  res.send(result);
};

export const jobCardList = async (req, res) => {
  try {
    const { JC_Status, Start_Date, End_Date } = req.body;
    const validation = [];

    if (JC_Status.length === 0 || JC_Status < 0) {
      validation.push("Please type Valid Status");
    }
    if (Start_Date.trim().length === 0 && Start_Date === undefined) {
      validation.push("Start date value is required");
    }
    if (End_Date.trim().length === 0 && End_Date === undefined) {
      validation.push("End date value is required");
    }

    if (validation.length === 0) {
      console.log(validation.length);
      const startedDate = new Date(Start_Date);
      const endDate = new Date(End_Date);

      const result = await DB.JobCard.findAll({
        where: {
          [Op.and]: {
            JC_Status: JC_Status,
            JC_Added_Date: {
              [Op.and]: {
                [Op.gte]: startedDate,
                [Op.lte]: endDate,
              },
            },
          },
        },
        // Maybe Use Sequelize Literals
        // Maybe relation between assetCatJobMapping and Job Model
        include: [
          {
            model: DB.Job,
            required: true,
            attributes: ["assignedId", "title", "createdAt"],
            include: [
              {
                model: DB.Permit,
                attributes: ["permitNumber", "facilityId"],
                required: false,
              },
              {
                model: DB.JobMappingAsset,
                attributes: [["jobId", "assetJobId"]],

                include: [
                  {
                    model: DB.AssetCategory,
                    attributes: ["name"],
                  },
                ],
                group: ["jobMappingAssets.jobId"],
              },
            ],
          },
        ],
      });

      if (result.length === 0) {
        res.status(200).send({
          success: true,
          message: "Not Found",
          data: [],
        });
      }
      if (result.length !== 0) {
        res.status(200).send({
          success: true,
          message: "OK",
          data: result,
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: validation,
      });
    }
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

// {
//   model: permit,
//   required: false,
//   attributes: ["permitNumber", "facilityId"],
// },

// Get Job Details
// Check JobWorkType Error
export const jobCardDetails = async (req, res) => {
  try {
    const { jcId } = req.body;
    const valid = [];

    if (jcId === undefined || jcId < 0) {
      valid.push("Insert Valid JobCard ID");
    }

    if (valid.length === 0) {
      const result = await DB.JobCard.findAll({
        where: { id: jcId },
        attributes: [
          /* Attributes lets you include only selected fields below in result */
          "PTW_id",
          "JC_id",
          "id",
          "jobId",
          "JC_Carry_Forward",
          "JC_Status",
          "JC_title",
          "JC_Done_Description",
          "JC_Issued_By_Name",
          "JC_Start_By_id",
          "JC_Start_By_Name",
          "JC_Approved_By_Name",
          "JC_End_By_Name",
          // "JC_Issue_By_id",
          "Facility_id",
        ],
        // WIthout jobs there are no jobCards so jobs model is the parent of the jobCard model
        include: [
          {
            model: DB.Job,
            required: true,
            attributes: ["id", "title", "description", "createdBy"],
            include: [
              // Add association of job with permit and vice versa
              {
                model: DB.Permit,
                required: true,
                attributes: [
                  "id",
                  "code",
                  "description",
                  "title",
                  "facilityId",
                  "permitNumber",
                  "blockId",
                ],
                include: [
                  {
                    model: DB.PermitAssetLists,
                    required: true,
                    attributes: ["id", "assetId"],
                  },
                ],
              },
            ],
          },
        ],
      });

      if (result.length === 0) {
        res.status(200).send({
          success: true,
          message: "Not Found",
          data: [],
        });
      }
      if (result.length !== 0) {
        res.send(result);
        console.log(result);

        const obj = JSON.parse(JSON.stringify(result));
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          const { PTW_id, JC_id, id, jobId } = obj[keys[i]];

          permitLotoAssets(PTW_id);
          permitIsolatedAssets(PTW_id);
          jobCardFilesFetch(JC_id);
          returnJobCardHistory(id, jobId);
          getJobAssociatedWorkType(jobId);
          // getJobAssociatedWorkType(3039);
          getJobCardAssociatedStandardAction(jobId);
        }
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
      });
    }
  } catch (error) {
    res.status(501).send({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const employeeDetails = async (req, res) => {
  try {
    const { jobCreatedBy } = req.body;

    if (!jobCreatedBy || !validator.isEmail(jobCreatedBy)) {
      console.log(validator.isEmail(jobCreatedBy));
      const result = await DB.EmployeeDetails.findAll({
        limit: 5,
      });

      res.status(200).send({
        success: true,
        message: "Type Valid Email",
        data: result,
      });
    } else {
      const result = await DB.EmployeeDetails.findAll({
        where: { Emp_Email_id: jobCreatedBy },
        attributes: ["Emp_First_Name", "Emp_Last_Name"],
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    }
  } catch (error) {
    res.status(501).send({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const permitLotoAssets = (ptw_id) => {
  // const { PTW_id } = req.body;

  DB.PermitLotoAsset.findAll({
    where: { PTW_id: ptw_id },
  }).then((result) => {
    // res.send(result);
    console.log(result);
  });
};

export const permitIsolatedAssets = (ptw_id) => {
  DB.PermitIsolatedAsset.findAll({
    where: {
      permitId: ptw_id,
    },
  }).then((result) => {
    console.log(result);
  });
};

export const jobCardFilesFetch = (JC_id) => {
  DB.JobCardFiles.findAll({
    where: {
      JC_id: JC_id,
    },
  }).then((result) => {
    console.log(result);
  });
};

export const returnJobCardHistory = (jcId, job_id) => {
  DB.HistoryTable.findAll({
    where: {
      [Op.and]: {
        moduleRefId: jcId,
        moduleType: 3,
        // jobId: job_id,
      },
    },
    attributes: [
      "approvalStatus",
      "closeCarryForwardStatus",
      "comment",
      "postedBy",
      "addedTimeStamp",
      "currentLat",
      "currentLong",
    ],
    include: [
      {
        model: DB.JobCard,
        required: true,
        where: { jobId: job_id },
        required: true,
        attributes: [
          "JC_Carry_Forward",
          "JC_Start_By_Name",
          "JC_Issued_By_Name",
          "JC_Rejected_By_Name",
        ],
        include: [
          {
            model: DB.Permit,
            attributes: [
              "inchargeId",
              "inchargeStatus",
              "inchargeRequestedToId",
            ],
            required: true,
          },
        ],
      },
    ],
  }).then((result) => {
    console.log(result);

    const obj = JSON.parse(JSON.stringify(result));
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const { approvalStatus, closeCarryForwardStatus } = obj[keys[i]];

      console.log(approvalStatus, closeCarryForwardStatus);

      const Status = getJobCardStatus(approvalStatus, closeCarryForwardStatus);
      // const Status = getJobCardStatus(3, 0);
      console.log(Status);
    }
  });
};

export const getJobCardStatus = (approvalStatus, closeCarryForwardStatus) => {
  console.log(approvalStatus, closeCarryForwardStatus);
  let Approval_Status, Status;
  // console.log(JC_NO_CARRY_FORWARD === 0, JC_OPEN === 0);

  if (
    closeCarryForwardStatus === JC_NO_CARRY_FORWARD &&
    approvalStatus === JC_CLOSE
  ) {
    Status = "Closed";
    Approval_Status = "Waiting for Approval";
  } else if (
    (closeCarryForwardStatus === JC_Carry_Forward ||
      closeCarryForwardStatus === JC_NO_CARRY_FORWARD) &&
    approvalStatus === JC_OPEN
  ) {
    Status = "Open";
    Approval_Status = " - Work in Progress";
  } else if (
    closeCarryForwardStatus === JC_Carry_Forward &&
    approvalStatus === JC_CLOSE
  ) {
    Status = "Carry Forward";
    Approval_Status = "Waiting for Approval";
  } else if (approvalStatus === JC_REJECT) {
    if (closeCarryForwardStatus === JC_NO_CARRY_FORWARD) {
      Status = "Closed";
    } else if (closeCarryForwardStatus === JC_Carry_Forward) {
      Status = "Carry Forward";
    }

    Approval_Status = "Rejected";
  } else if (approvalStatus === JC_APPROVE) {
    if (closeCarryForwardStatus === JC_NO_CARRY_FORWARD) {
      Status = "Closed";
    } else if (closeCarryForwardStatus === JC_Carry_Forward) {
      Status = "Carry Forward";
    }
    Approval_Status = "Approved";
  } else if (approvalStatus === JC_AUTO_APPROVE) {
    if (closeCarryForwardStatus === JC_NO_CARRY_FORWARD) {
      Status = "Closed";
    } else if (closeCarryForwardStatus === JC_Carry_Forward) {
      Status = "Carry Forward";
    }
    Approval_Status = "Auto Approved";
  } else if (approvalStatus === JC_PTW_TIMEOUT) {
    Status = "Carry Forward";
    Approval_Status = "Waiting for Approval";
  } else {
    Status = "No";
    Approval_Status = "No";
  }

  // console.log(Status, Approval_Status);
  return Status + " " + Approval_Status;
  // setTimeout(() => {
  //   console.log(`${Status} - ${Approval_Status}`);
  // }, 5000);
};

export const getJobAssociatedWorkType = (jobId) => {
  DB.WorkTypeAssociatedToJob.findAll({
    where: { jobId: jobId },
    attributes: ["otherWorkTypeName", "workTypeId"],
    include: [
      {
        model: DB.JobWorkType,
        required: false,
        attributes: ["workTypeName"],
        include: [
          {
            model: DB.AssetCategory,
            required: false,
            attributes: ["name"],
          },
        ],
      },
    ],
  }).then((result) => {
    console.log(result);
  });
};

export const getJobCardAssociatedStandardAction = (jobId) => {
  // let jcId =
  DB.JobCard.findAll({
    where: {
      jobId: jobId,
    },
    attributes: ["id"],
  })
    .then((result) => {
      const obj = JSON.parse(JSON.stringify(result));
      const keys = Object.keys(obj);
      let res;
      for (let i = 0; i < keys.length; i++) {
        const { id } = obj[keys[i]];

        res = id;
      }
      return res;
    })
    .then((result) => {
      let res;
      DB.JobCardAssociatedStandardAction.findAll({
        where: {
          jcId: result,
        },
        attributes: ["standardActionId", "otherStandardActionName"],
        include: [
          {
            model: DB.StandardAction,
            required: false,
            attributes: ["standardAction"],
          },
        ],
      }).then((result) => {
        res = result;
      });
      return res;
    })
    .then((result) => {
      console.log(result);
    });
};
// jobCardAssociatedStandardAction
//   .findAll({
//     where: {
//       jcId: jcId,
//     },
//     attributes: ["standardActionId", "otherStandardActionName"],
//     include: [
//       {
//         model: standardActions,
//         required: false,
//         attributes: ["standardAction"],
//       },
//     ],
//   })
// .then((result) => {
//   console.log(result);
// });

export const insertCommentCommon = (req, res) => {
  const {
    moduleType,
    moduleRefId,
    moduleRefIdSecondary,
    comment,
    postedBy,
    approvalStatus,
    closeCarryForwardStatus,
    postByName = "",
    currentLat,
    currentLong,
  } = req.body;
  console.log(insertComment);
  insertComment(
    moduleType,
    moduleRefId,
    moduleRefIdSecondary,
    comment,
    postedBy,
    approvalStatus,
    closeCarryForwardStatus,
    postByName,
    currentLat,
    currentLong
  ).then((employee) => {
    console.log(employee.firstName, employee.lastName);
    res.send(
      `Comment generated by ${employee.firstName} ${employee.lastName}.`
    );
  });
};

export const empHistoryDetails = async (req, res) => {
  try {
    const { moduleType, moduleRefId } = req.body;
    const valid = [];
    if (
      moduleType === undefined ||
      moduleType < 0 ||
      moduleRefId === undefined ||
      moduleRefId < 0
    ) {
      valid.push("Enter Valid Value");
    }
    if (valid.length === 0) {
      const result = await getHistoryDetails(moduleType, moduleRefId);

      if (result.length === 0) {
        res.status(200).send({
          success: true,
          message: "NF",
          data: [],
        });
      }
      if (result.length !== 0) {
        res.status(200).send({
          success: true,
          message: "OK",
          data: result,
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
      });
    }
  } catch (error) {
    res.status(501).send({
      success: false,
      message: error.message,
      data: [],
    });
  }
};
