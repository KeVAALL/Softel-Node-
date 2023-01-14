import { Op, Sequelize, fn } from "sequelize";
import { getCurrentTime, dateIsValid } from "../../../utility/common.js";
import DB from "../../../utility/connection.js";

/* To get workType List */
export const workTypeList = async (req, res) => {
  try {
    const { categoryIds } = req.body;
    console.log(categoryIds);

    if (categoryIds.length == 0) {
      console.log(`inside category is missing`);
      res.send(`Category Id is missing`);
      return false;
    }
    const result = await DB.AssetCategory.findAll({
      attributes: [
        ["id", "categoryId"],
        ["name", "categoryName"],
      ],
      include: [
        {
          model: DB.JobWorkType,
          attributes: ["id", "equipmentCategoryId", "workTypeName"],
        },
      ],
      where: {
        id: categoryIds,
      },
    });
    res.send({
      succuss: true,
      message: `Record(s) found`,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

/* To get Linked Tools to work type */
export const linkedToolsToWorkType = async (req, res) => {
  try {
    const { workTypeIds } = req.body;
    if (workTypeIds.length > 0) {
      DB.JobWorkType.hasOne(DB.WorkTypeAssociatedTool, {
        sourceKey: "id",
        foreignKey: "workTypeId",
      });
      DB.WorkTypeAssociatedTool.belongsTo(DB.JobWorkType, {
        targetKey: "id",
        foreignKey: "workTypeId",
      });
      DB.WorkTypeAssociatedTool.hasMany(DB.WorkTypeMasterAsset, {
        foreignKey: "ToolId",
      });

      const result = await DB.WorkTypeAssociatedTool.findAll({
        include: [
          {
            model: DB.JobWorkType,
            attributes: [],
            where: {
              workTypeId: workTypeIds,
            },
          },
          {
            model: DB.WorkTypeMasterAsset,
          },
        ],
      });
      res.send(result);
      // const sql = `SELECT group_concat(a.Asset_Name SEPARATOR ', ') as linkedTools FROM FlexiMC_Work_Type_Associated_Tools as t
      //     LEFT JOIN FlexiMC_Job_Work_Type as w ON w.id = t.work_type_id
      //     LEFT JOIN FlexiMC_Inventory_Master_Asset as a ON FIND_IN_SET(a.id, t.associated_tool_id) where w.id IN(${work_type_ids})`;
      // const result = await runQuery(SELECT, sql);
      // res.send(result);
    } else {
      res.send(`Error: work type ids is empty`);
    }
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

/* To get Job List of Facility based or for all facility */
export const jobList = async (req, res) => {
  try {
    // Declare and assign variable
    let { facilityId, jobType, startDate, endDate } = req.body;
    const validation = [];
    const queryCondition = {};
    const jobTypes = [0];
    const currentDate = getCurrentTime(false);

    //validate end user inputs
    if (facilityId !== undefined && (isNaN(facilityId) || facilityId === 0)) {
      validation.push(
        "Facility Id should be integer and value should be non zero"
      );
    }

    if (jobTypes.indexOf(jobType) === -1 && jobType !== undefined) {
      validation.push("Job Type Id is not valid");
    }

    if (startDate === undefined && endDate !== undefined) {
      validation.push("Start date value is required");
    }

    if (startDate !== undefined && endDate === undefined) {
      validation.push("End date value is required");
    }

    if (startDate !== undefined && endDate !== undefined) {
      if (!dateIsValid(startDate)) {
        validation.push(
          "Start Date value should be valid and YYYY-MM-DD format"
        );
      }

      if (!dateIsValid(endDate)) {
        validation.push("End Date value should be valid and YYYY-MM-DD format");
      }
    }

    // If validation pass
    if (validation.length === 0) {
      // Assign default value is not provided by user
      if (jobType === undefined) {
        jobType = 0;
      }

      if (startDate === undefined && endDate === undefined) {
        startDate = endDate = currentDate;
      }

      // Prepare query condition to get list
      queryCondition.belongsTo = jobType;
      queryCondition.createdAt = { [Op.between]: [startDate, endDate] };

      if (facilityId !== undefined) {
        queryCondition.facilityId = facilityId;
      }

      console.log(queryCondition);
      // Request DB for data
      const result = await DB.Job.findAll({
        attributes: {
          include: [
            [Sequelize.col("facility.name"), "facilityName"],
            [Sequelize.col("block.name"), "blockName"],
            [
              Sequelize.fn(
                "concat",
                Sequelize.col("creator.firstName"),
                " ",
                Sequelize.col("creator.lastName")
              ),
              "createdByFullName",
            ],
            [
              Sequelize.fn(
                "concat",
                Sequelize.col("updater.firstName"),
                " ",
                Sequelize.col("updater.lastName")
              ),
              "updatedByFullName",
            ],
            [
              Sequelize.fn(
                "concat",
                Sequelize.col("assignee.firstName"),
                " ",
                Sequelize.col("assignee.lastName")
              ),
              "assigneeFullName",
            ],
          ],
        },
        include: [
          {
            model: DB.Facility,
            as: "facility",
            attributes: [],
          },
          {
            model: DB.Facility,
            as: "block",
            attributes: [],
          },
          {
            model: DB.User,
            as: "creator",
            attributes: [],
          },
          {
            model: DB.User,
            as: "updater",
            attributes: [],
          },
          {
            model: DB.User,
            as: "assignee",
            attributes: [],
          },
        ],
        where: queryCondition,
        raw: true,
      });
      res.status(200).send({
        succuss: true,
        message: "200 Status, OK",
        data: result,
      });
    } else {
      res.status(400).send({
        succuss: false,
        message: "Bad request",
        data: validation,
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

/* To Create New Job */
export const createJob = async (req, res) => {
  try {
    const createdAt = getCurrentTime();
    const {
      facilityId,
      blockId,
      title,
      description,
      breakdownTime,
      createdBy,
      assignedId,
      belongsTo,
      equipments,
      workType,
      otherWorkTypeName,
    } = req.body;

    //Add validation
    const validation = [];

    if (facilityId === undefined || isNaN(facilityId) || facilityId === 0) {
      validation.push(
        "Facility should not be blank OR facility Id should be integer and value should be non zero"
      );
    }

    if (blockId === undefined || isNaN(blockId) || blockId === 0) {
      validation.push(
        "Block should not be blank OR Block Id should be integer and value should be non zero"
      );
    }

    const JobResult = await DB.Job.create({
      facilityId,
      blockId,
      title,
      description,
      breakdownTime,
      createdBy,
      createdAt,
      assignedId,
      belongsTo,
    });

    const jobId = JobResult.id;

    let assetInsertValue = equipments.map((data) => {
      return {
        jobId: jobId,
        assetId: data.assetId,
        categoryId: data.categoryId,
      };
    });

    let workTypeInsertValue = workType.map((data) => {
      return { jobId, workTypeId: data.workType, otherWorkTypeName };
    });

    const JobMappingAssetsResult = await DB.JobMappingAsset.bulkCreate(
      assetInsertValue
    );
    const jobAssociatedWorkTypeResult =
      await DB.JobAssociatedWorkType.bulkCreate(workTypeInsertValue);

    if (jobId && JobMappingAssetsResult && jobAssociatedWorkTypeResult) {
      const result = await DB.Job.findByPk(jobId);
      res.send(result);
    } else {
      throw { status: "failed", msg: `Sorry something went wrong` };
    }
  } catch (error) {
    res.status(501).send({
      succuss: false,
      message: error.message,
      data: [],
    });
  }
};

/* To update exiting Job */
export const updateJob = async (req, res) => {
  try {
    const current_date = getCurrentTime();
    const { jobId, status, permitId, assignedTo, employeeId } = req.body;

    const updatedData = {
      linkedPermit: permitId,
      assignedId: assignedTo,
      updatedBy: employeeId,
      status: status,
      updatedAt: current_date,
    };

    const jobUpdate = await DB.Job.findOne({ where: { id: jobId } });
    const result = await jobUpdate.update(updatedData);

    if (result) {
      res.send(result);
    } else {
      throw { status: "failed", msg: `Sorry something went wrong` };
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", msg: error });
  }
};

/*To delete exiting job */
export const deleteJob = async (req, res) => {
  try {
    const current_date = getCurrentTime();
    const { comment, employeeId, jobId } = req.body;

    const updatedData = {
      cancelStatus: "N",
      cancellationRemarks: comment,
      updatedAt: current_date,
      updatedBy: employeeId,
    };
    const jobUpdate = await DB.Job.findOne({ where: { id: jobId } });
    const result = await jobUpdate.update(updatedData);

    if (result) {
      res.send(result);
    } else {
      throw { status: "failed", msg: `Sorry something went wrong` };
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", msg: error });
  }
};

export const jobDetails = async (req, res) => {
  const { jobId } = req.body;

  const result = await DB.Job.findAll({
    where: {
      id: jobId,
    },
  });

  res.status(200).send({
    data: "Job Details",
    result,
  });
};
