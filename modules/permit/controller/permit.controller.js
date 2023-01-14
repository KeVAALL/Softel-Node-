import { ResultWithContext } from "express-validator/src/chain/context-runner-impl.js";
import { Sequelize } from "sequelize";
import { Op, QueryTypes } from "sequelize";
import { getCurrentTime } from "../../../utility/common.js";
// import permittypelists from "../model/permittypelist.model.js";
// import permitblocks from "../model/permitblocks.model.js";
// import permitsafetyquestions from "../model/permitsafetyquestions.model.js";
// import permittypesafetymeasures from "../model/permittypesafetymeasures.model.js";
// import permitlotoassets from "../model/permitlotoassets.model.js";
// import permitisolatedassetcategories from "../model/permitisolatedassetcategories.model.js";
// import permitemployeelists from "../model/permitemployeelists.model.js";
// import permitassetlists from "../model/permitassetlists.model.js";
// import permits from "../model/permits.model.js";

import DB from "../../../utility/connection.js";

export const permitTypeListDemo = async (req, res) => {
  // this is not right way to code in orm.
  const facility_id = req.params.FacilityId;
  console.log("Permit Type List");
  let sql = `SELECT DISTINCT PTW_Type_id, PTW_Type_Title FROM fleximc_ptw_type_list WHERE Facility_id = '46' AND PTW_Type_status = 1`;
  const result = await runQuery(SELECT, sql);
  console.log(result);
  res.send(result);
};

// start here.

// export const permitTypeList = async (req, res) => {
//   // console.log("permitTypeList checking");

//   const { facilityId, status } = req.body;

//   const result = await DB.permittypelists.findAll({
//     where: {
//       facilityId: facilityId,
//       status: status,
//     },
//   });

//   res.send(result);
// };

export const permitCreate = async (req, res) => {
  try {
    const {
      ptwblockId,
      ptwtypeId,
      ptwcode,
      ptwHWId,
      ptwstartDate,
      ptwendDate,
      ptwtitle,
      ptwdescription,
      ptwfacilityId,
      ptwempId,
      ptwstatus,
      reccomendationsByApprover,
      ptwIsolation,
      ptwlockSrNo,
      ptwtagSrNo,
      ptwLOTOStatus,
    } = req.body;

    const valid = [];

    if (
      ptwblockId === 0 ||
      ptwtypeId === 0 ||
      ptwcode.trim().length === 0 ||
      ptwHWId === 0 ||
      ptwstartDate.trim().length === 0 ||
      ptwendDate.trim().length === 0 ||
      ptwtitle.trim().length === 0 ||
      ptwdescription.trim().length === 0 ||
      ptwfacilityId === 0 ||
      ptwempId === 0 ||
      ptwstatus === 0 ||
      reccomendationsByApprover.trim().length === 0 ||
      ptwIsolation === 0 ||
      ptwlockSrNo.trim().length === 0 ||
      ptwtagSrNo.trim().length === 0 ||
      ptwLOTOStatus === 0
    ) {
      valid.push("Enter Valid Permit Details");
    }

    if (valid.length === 0) {
      const permit = {
        code: ptwcode,
        typeId: ptwtypeId,
        title: ptwtitle,
        description: ptwdescription,
        facilityId: ptwfacilityId,
        blockId: ptwblockId,
        empId: ptwempId,
        status: ptwstatus,
        startDate: ptwstartDate,
        endDate: ptwendDate,
        Isolation: ptwIsolation,
        lockSrNo: ptwlockSrNo,
        tagSrNo: ptwtagSrNo,
        LOTOStatus: ptwLOTOStatus,
        reccomendationsByApprover: reccomendationsByApprover,
      };

      let permitResult = await DB.Permit.create(permit);

      const keys = Object.keys(permitResult);
      let ptwId;
      for (let i = 0; i < keys.length; i++) {
        const { id } = permitResult[keys[i]];
        ptwId = id;
        console.log(id);
      }

      if (permitResult.length === 0) {
        res.status(200).send({
          success: true,
          message: "Not Created",
          data: [],
        });
      }
      if (permitResult.length !== 0) {
        res.status(200).send({
          success: true,
          message: "OK",
          data: result,
        });
      }

      let permitUpdate = await DB.Permit.update(
        {
          LOTOStatus: ptwLOTOStatus,
          LOTOId: ptwId,
          LOTOCode: ptwId,
          HWId: ptwHWId,
          jobId: ptwId,
          TBTId: ptwId,
          Isolation: ptwIsolation,
          reccomendationsByApprover: reccomendationsByApprover,
        },
        {
          where: {
            id: ptwId,
          },
        }
      );
    }
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

export const permitApprove = async (req, res) => {
  try {
    const {
      id,
      approvedStatus,
      approvedDate,
      approveRequestedToId,
      maintenanceId,
      attachedTo,
    } = req.body;

    if (
      id === 0 ||
      approvedStatus === 0 ||
      approvedDate.trim().length === 0 ||
      approveRequestedToId === undefined ||
      approveRequestedToId.type() === "string" ||
      maintenanceId === 0 ||
      attachedTo === 0
    ) {
      valid.push("Enter Valid Details");
    }

    if (valid.length === 0) {
      const result = await DB.Permit.update(
        {
          approvedStatus: approvedStatus,
          approvedDate: approvedDate,
          approveRequestedToId: approveRequestedToId,
          maintenanceId: maintenanceId,
          attachedTo: attachedTo,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).send({
        success: true,
        message: "Updated",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const permitIssue = async (req, res) => {
  try {
    const {
      id,
      approvedStatus,
      approvedDate,
      issuedStatus,
      maintenanceId,
      issuedDate,
      attachedTo,
    } = req.body;

    const valid = [];

    if (
      id === 0 ||
      approvedStatus === 0 ||
      approvedDate.trim().length === 0 ||
      issuedStatus === 0 ||
      maintenanceId === 0 ||
      issuedDate.trim().length === 0 ||
      attachedTo === 0
    ) {
      valid.push("Enter Valid Details");
    }

    if (valid.length === 0) {
      const result = await DB.Permit.update(
        {
          approvedStatus: approvedStatus,
          approvedDate: approvedDate,
          issuedStatus: issuedStatus,
          maintenanceId: maintenanceId,
          issuedDate: issuedDate,
          attachedTo: attachedTo,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).send({
        success: true,
        message: "Updated",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const permitReject = async (req, res) => {
  try {
    const { id, issuedDate, issuedById, issuedStatus, issuedReccomendations } =
      req.body;

    const valid = [];

    if (
      id === 0 ||
      issuedStatus === 0 ||
      issuedDate.trim().length === 0 ||
      issuedById === 0 ||
      issuedReccomendations.trim().length === 0
    ) {
      valid.push("Enter Valid Details");
    }

    if (valid.length === 0) {
      const result = await DB.Permit.update(
        {
          id,
          issuedDate,
          issuedById,
          issuedStatus,
          issuedReccomendations,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).send({
        success: true,
        message: "Updated",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const updateEmployeeList = async (req, res) => {
  const { id } = req.body;

  const result = await DB.EmployeeList.update(
    {
      ptwStatus: 2,
    },
    {
      where: {
        ptwId: id,
      },
    }
  );

  res.status(200).send({
    result,
    Status: "Updated",
  });
};

export const permitCancel = async (req, res) => {
  console.log("Cancel End Point ");

  const {
    id,
    issuedRequestedToId,
    facilityId,
    issuedStatus,
    approvedStatus,
    approvedDate,
    approveRequestedToId,
    cancelRequestById,
    cancelRequestStatus,
    cancelRequestDate,
    cancelReccomendations,
    cancelRequestApproveById,
    cancelRequestApproveDate,
    cancelRequestApproveStatus,
    inchargeStatus,
    inchargeDate,
    inchargeId,
    inchargeReccomendations,
  } = req.body;

  const valid = [];

  if (
    id === 0 ||
    facilityId === 0 ||
    issuedStatus === undefined ||
    approvedStatus === undefined ||
    approvedDate.trim().length === 0 ||
    approveRequestedToId === undefined ||
    cancelRequestById === undefined ||
    cancelRequestStatus === undefined ||
    cancelRequestDate.trim().length === 0 ||
    cancelReccomendations.trim().length === 0 ||
    cancelRequestApproveById === undefined ||
    cancelRequestApproveDate.trim().length === 0 ||
    cancelRequestApproveStatus === undefined ||
    inchargeStatus === undefined ||
    inchargeDate.trim().length === 0 ||
    inchargeId === undefined ||
    inchargeReccomendations.trim().length === 0
  ) {
    valid.push("Enter Valid Permit Details");
  }

  const result = await DB.Permit.update(
    {
      id: id,
      issuedRequestedToId: issuedRequestedToId,
      facilityId: facilityId,
      issuedStatus: issuedStatus,
      approvedStatus: approvedStatus,
      approvedDate: approvedDate,
      approveRequestedToId: approveRequestedToId,
      cancelRequestById: cancelRequestById,
      cancelRequestStatus: cancelRequestStatus,
      cancelRequestDate: cancelRequestDate,
      cancelReccomendations: cancelReccomendations,
      cancelRequestApproveById: cancelRequestApproveById,
      cancelRequestApproveDate: cancelRequestApproveDate,
      cancelRequestApproveStatus: cancelRequestApproveStatus,
      inchargeStatus: inchargeStatus,
      inchargeDate: inchargeDate,
      inchargeId: inchargeId,
      inchargeReccomendations: inchargeReccomendations,
    },
    {
      where: {
        id: id,
      },
    }
  );

  if (result) {
    res.send(result);
  } else {
    throw { status: "failed", msg: `Sorry something went wrong` };
  }
};

export const permitBlocks = async (req, res) => {
  console.log("PermitBlocks checking... ");
  const { block_id } = req.body;
  const result = await permitblocks.findAll({
    where: {
      block_id: block_id,
    },
  });

  if (result) {
    res.send(result);
  } else {
    throw { status: "failed", msg: `Sorry something went wrong` };
  }
};

export const permitSafetyQuestions = async (req, res) => {
  try {
    const { PermitId } = req.params;

    const valid = [];

    if ((PermitId = 0 || PermitId < 0 || PermitId === undefined)) {
      valid.push("Enter Valid Permit id");
    }

    if (valid.length === 0) {
      const result = await DB.PermitSafetyQuestions.findAll({
        where: {
          permitId: PermitId,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const permitSafetyMeasure = async (req, res) => {
  try {
    const { PermitTypeId } = req.params;

    const valid = [];

    if ((PermitTypeId = 0 || PermitTypeId < 0 || PermitTypeId === undefined)) {
      valid.push("Enter Valid Permit id");
    }

    if (valid.length === 0) {
      const result = await DB.PermitSafetyMeasure.findAll({
        where: {
          permitTypeId: PermitTypeId,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const permitToWorkDateSelectionData = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const validation = [];

    const startedDate = new Date(startDate);
    const endedDate = new Date(endDate);

    if (
      (startedDate.trim().length === 0 && endedDate === undefined) ||
      (endDate.trim().length === 0 && endDate === undefined)
    ) {
      validation.push("date required");
    }

    if (validation.length === 0) {
      const result = await DB.Permit.findAll({
        where: {
          // [Op.and]: {
          //   /* Alternative to above example */
          //   [Op.gte]: startedDate,
          //   [Op.lte]: endedDate,
          // },
          [Op.and]: {
            startDate: {
              [Op.gte]: startedDate,
            },
            endDate: {
              [Op.lte]: endedDate,
            },
            [Op.ne]: {
              cancelRequestApproveStatus: 1,
            },
          },
        },
        limit: 3,
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
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

export const permitToWorkDetails = async (req, res) => {
  try {
    const { permitId } = req.body;

    const result = await DB.Permit.findAll({
      where: {
        id: permitId,
      },
    });

    res.status(200).send({
      success: true,
      message: "OK",
      data: result,
    });
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

export const permitAssetListResult = async (req, res) => {
  try {
    const { permitId } = req.body;

    const result = await DB.PermitAssetLists.findAll({
      where: {
        ptwId: permitId,
      },
    });

    res.status(200).send({
      success: true,
      message: "OK",
      data: result,
    });
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

export const permitEmployeeList = async (req, res) => {
  try {
    const { permitId } = req.body;
    const valid = [];

    if ((permitId = 0 || permitId < 0 || permitId === undefined)) {
      valid.push("Enter Valid Permit id");
    }

    if (valid.length === 0) {
      const result = await DB.EmployeeList.findAll({
        where: {
          [Op.and]: {
            ptwId: permitId,
            ptwEmployeeStatus: 1,
          },
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const getBlockList = async (req, res) => {
  try {
    const { facilityId } = req.body;

    const valid = [];

    if ((facilityId = 0 || facilityId < 0 || facilityId === undefined)) {
      valid.push("Enter Valid Permit id");
    }

    if (valid.length === 0) {
      const result = await DB.Facility.findAll({
        where: {
          id: facilityId,
        },
        attributes: ["id", "name"],
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const getPermitTypeList = async (req, res) => {
  try {
    const { facilityId } = req.body;

    const valid = [];

    if ((facilityId = 0 || facilityId < 0 || facilityId === undefined)) {
      valid.push("Enter Valid Facility id");
    }

    if (valid.length === 0) {
      const result = await DB.PermitTypeList.findAll({
        where: {
          facilityId,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const getAssetList = async (req, res) => {
  try {
    const { facilityId } = req.body;

    const valid = [];

    if ((facilityId = 0 || facilityId < 0 || facilityId === undefined)) {
      valid.push("Enter Valid Facility id");
    }

    if (valid.length === 0) {
      const result = await DB.Assets.findAll({
        where: {
          facilityId,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const tbtList = async (req, res) => {
  try {
    const { tbtId } = req.body;

    const valid = [];

    if ((tbtId = 0 || tbtId < 0 || tbtId === undefined)) {
      valid.push("Enter Valid Facility id");
    }

    if (valid.length === 0) {
      const result = await DB.TBT.findAll({
        where: {
          tbtId,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const tbtRiskAssessment = async (req, res) => {
  try {
    const { tbtId } = req.body;

    const valid = [];

    if ((tbtId = 0 || tbtId < 0 || tbtId === undefined)) {
      valid.push("Enter Valid Facility id");
    }

    if (valid.length === 0) {
      const result = await DB.tbtRiskAssessment.findAll({
        where: {
          tbtId,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const tbtJobList = async (req, res) => {
  try {
    const { tbtJobTitle } = req.body;

    const valid = [];

    if (tbtJobTitle.trim().length === 0 || tbtJobTitle === undefined) {
      valid.push("Enter Valid Job Title");
    }

    if (valid.length === 0) {
      const result = await DB.tbtJobList.findAll({
        where: {
          tbtJobTitle,
        },
      });

      res.status(200).send({
        success: true,
        message: "OK",
        data: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const permitDetails = async (req, res) => {
  try {
    const { permitId } = req.body;

    const valid = [];

    if ((permitId = 0 || permitId < 0 || permitId === undefined)) {
      valid.push("Enter Valid Permit id");
    }

    if (valid.length === 0) {
      const result = await DB.Permit.findAll({
        where: {
          permitId,
        },
      });

      res.status(200).send({
        data: "Permit Details",
        result: result,
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        error: valid,
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

export const permitCreatePractice = async (req, res) => {};

// safetyTitle,
// safetyDiscription,
// safetyInput,
// safetyRequired,
// createdBySM,
// updatedBySM,
// block_id,
// assetId,
// createdByAssetlist,
// updatedByAssetlist,
// assetCategoryId,
// createdByIsolatedAsset,
// updatedByIsolatedAsset,
// normalisedStatus,
// normalised_date,
// Loto_Asset_id,
// Loto_Key,
// lotoRemovedStatus,
// lotoRemovedDate,
// employeeId,
// createdByEmployee,
// updatedByEmployee,
// empStatus,
// responsibility,
// isCustomEmployee,
// safetyMeasureValue,
// safetyMeasureId,

// let permitBlockResult = await permitblocks.create({
//   ptw_id: ptwId,
//   block_id: block_id,
// });

// console.log(permitBlockResult);

// let permitAssetListResult = await permitassetlists.create({
//   ptwId: ptwId,
//   assetId: assetId,
//   createdBy: createdByAssetlist,
//   updatedBy: updatedByAssetlist,
// });

// console.log(permitAssetListResult);

// let permitisolatedAssetCategoriesResult =
//   await permitisolatedassetcategories.create({
//     permitId: ptwId,
//     assetCategoryId: assetCategoryId,
//     createdBy: createdByIsolatedAsset,
//     normalisedStatus: normalisedStatus,
//     normalisedDate: normalised_date,
//     updatedBy: updatedByIsolatedAsset,
//   });

// console.log(permitisolatedAssetCategoriesResult);

// let permitLotoAssetsResult = await permitlotoassets.create({
//   PTW_id: ptwId,
//   Loto_Key: Loto_Key,
//   Loto_Asset_id: Loto_Asset_id,
//   lotoRemovedStatus: lotoRemovedStatus,
//   lotoRemovedDate: lotoRemovedDate,
// });

// console.log(permitLotoAssetsResult);

// let permitEmployeelistsResult = await permitemployeelists.create({
//   pwtId: ptwId,
//   employeeId: employeeId,
//   createdBy: createdByEmployee,
//   updatedBy: updatedByEmployee,
//   responsibility: responsibility,
//   status: empStatus,
//   isCustomEmployee: isCustomEmployee,
// });

// console.log(permitEmployeelistsResult);

// let permitSafetyQuestions = await permitsafetyquestions.create({
//   permitId: ptwId,
//   safetyMeasureValue: safetyMeasureValue,
//   safetyMeasureId: safetyMeasureId,
// });

// console.log(permitSafetyQuestions);

// let permitTypeSafetyMeasuresResult = await permittypesafetymeasures.create({
//   permitTypeId: ptwtypeId,
//   title: safetyTitle,
//   discription: safetyDiscription,
//   input: safetyInput,
//   createdBy: createdBySM,
//   updatedBy: updatedBySM,
//   required: safetyRequired,
// });

// console.log(permitTypeSafetyMeasuresResult);

// export const permitAssetLists = async (req, res) => {
//   console.log("permitAssetLists");

//   const { assetId } = req.params;
//   //  const { assetId } = req.body;

//   const result = await permitassetlists.findAll({
//     where: {
//       assetId: assetId,
//     },
//   });

//   if (result) {
//     res.send(result);
//   } else {
//     throw { status: "failed", msg: `Sorry something went wrong` };
//   }
// };

// export const permitToWorkFetchList = async (req, res) => {
//   // const { startDate, endDate } = req.body;

//   const result = await DB.Permit.findAll({ limit: 3 });

//   res.send(result);
// };

// export const permitLOTOAssets = async (req, res) => {
//   console.log("permitLOTOAssets checking ..");
//   const { Ptw_Id } = req.params;
//   //  const { Ptw_Id } = req.body;

//   const result = await DB.PermitLotoAsset.findAll({
//     where: {
//       Ptw_id: Ptw_Id,
//     },
//   });

//   if (result) {
//     res.send(result);
//   } else {
//     throw { status: "failed", msg: `Sorry something went wrong` };
//   }
// };
// export const permitIsolatedAssetCategories = async (req, res) => {
//   console.log("permitIsolatedAssetCategories checking..");

//   const { permitId } = req.params;
//   //  const { permitId } = req.body;

//   const result = await DB.PermitIsolatedAssetCategories.findAll({
//     where: {
//       permitId: permitId,
//     },
//   });

//   if (result) {
//     res.send(result);
//   } else {
//     throw { status: "failed", msg: `Sorry something went wrong` };
//   }
// };
// export const permitDetailsPratice = async (req, res) => {
//   console.log("permitDetails here..");

//   const {
//     PTW_Title,
//     PTW_status_bubble,
//     PTW_date,
//     PTW_valid_date,
//     Facility_Name,
//     PTW_Code,
//     sitePermitNo,
//     PTW_Type_Title,
//     equipment_selected,
//     Selected_Blocks,
//     PTW_Disc,
//     PTW_Isolation_status,
//     PTW_Isolation_status_check,
//     PTW_LOTO_status_check,
//     IsolatedAssets,
//     Loto_Assest_List,
//     Employee_Selected,
//     Safety_Measure_ques,
//     tbt_data,
//     Non_Routine_Task_Status,
//     risk_data,
//     method_statement_data,
//     job_file_list,
//     ptw_associated_list,
//     history,
//     PTW_accepted_by_name,
//     PTW_accepted_date,
//     PTW_Accepted_Sign,
//     PTW_issued_requested_to_Name_C,
//     PTW_issued_date_S,
//     PTW_issued_requested_Sign_S,
//     PTW_Attched_To_HOTO,
//     PTW_Approve_requested_to_name_C,
//     PTW_Approved_date_S,
//     PTW_Approve_requested_Sign_S,
//     PTW_Completed_By_Name,
//     PTW_Completed_date,
//     PTW_Completed_By_Sign,
//     PTW_Cancelled_By_Name,
//     PTW_Cancelled_Date,
//     PTW_Cancelled_By_Sign_S,
//   } = req.body;

//   // res.send("permitDetails");

//   const permitDetails = [
//     {
//       PTW_title: PTW_Title,
//       PTW_status_bubble: PTW_status_bubble,
//       PTW_date: PTW_date,
//       PTW_valid_date: PTW_valid_date,
//       Facility_Name: Facility_Name,
//       PTW_Code: PTW_Code,
//       sitePermitNo: sitePermitNo,
//       PTW_Type_Title: PTW_Type_Title,
//       equipment_selected: equipment_selected,
//       Selected_Blocks: Selected_Blocks,
//       PTW_Disc: PTW_Disc,
//       PTW_Isolation_status: PTW_Isolation_status,
//       PTW_Isolation_status_check: PTW_Isolation_status_check,
//       PTW_LOTO_status_check: PTW_LOTO_status_check,
//       IsolatedAssets: IsolatedAssets,
//       Loto_Assest_List: Loto_Assest_List,
//       Employee_Selected: Employee_Selected,
//       Safety_Measure_ques: Safety_Measure_ques,
//       tbt_data: tbt_data,
//       Non_Routine_Task_Status: Non_Routine_Task_Status,
//       risk_data: risk_data,
//       method_statement_data: method_statement_data,
//       job_file_list: job_file_list,
//       ptw_associated_list: ptw_associated_list,
//       history: history,
//       PTW_accepted_by_name: PTW_accepted_by_name,
//       PTW_accepted_date: PTW_accepted_date,
//       PTW_Accepted_Sign: PTW_Accepted_Sign,
//       PTW_issued_requested_to_Name_C: PTW_issued_requested_to_Name_C,
//       PTW_issued_date_S: PTW_issued_date_S,
//       PTW_issued_requested_Sign_S: PTW_issued_requested_Sign_S,
//       PTW_Attched_To_HOTO: PTW_Attched_To_HOTO,
//       PTW_Approve_requested_to_name_C: PTW_Approve_requested_to_name_C,
//       PTW_Approved_date_S: PTW_Approved_date_S,
//       PTW_Approve_requested_Sign_S: PTW_Approve_requested_Sign_S,
//       PTW_Completed_By_Name: PTW_Completed_By_Name,
//       PTW_Completed_date: PTW_Completed_date,
//       PTW_Completed_By_Sign: PTW_Completed_By_Sign,
//       PTW_Cancelled_By_Name: PTW_Cancelled_By_Name,
//       PTW_Cancelled_Date: PTW_Cancelled_Date,
//       PTW_Cancelled_By_Sign_S: PTW_Cancelled_By_Sign_S,
//     },
//   ];

//   const tasksPermitDetails = [permitDetails];
//   console.log(tasksPermitDetails);

//   res.send(tasksPermitDetails);
//   console.log("Checking ...");
//   console.log(Safety_Measure_ques.Safety_Measure_title.length);
// };
