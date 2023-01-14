import { DataTypes, Op } from "sequelize";
import sequelize from "sequelize";
import { linkPermit } from "../../utility/constant.js";
import validator from "validator";
import DB from "../../utility/connection.js";

export const fetchPermitLinkList = async (req, res) => {
  try {
    const { facilityId, checkpoint, assetId } = req.body;
    const valid = [];
    if (
      facilityId === undefined ||
      facilityId < 0 ||
      assetId === undefined ||
      assetId < 0 ||
      checkpoint === undefined ||
      checkpoint < 0
    ) {
      valid.push("Enter Valid Value");
    }

    if (valid.length === 0) {
      if (checkpoint === 0) {
        const permitList = await DB.Permit.findAll({
          where: {
            facilityId: facilityId,
            issuedStatus: 1,
            acceptedStatus: 1,
            approvedStatus: 1,
            completedStatus: 0,
            cancelRequestStatus: 0,
            cancelRequestApproveStatus: 0,
            status: 1,
            attachedTo: [0, 1],
            "$permitassetlists.assetId$": assetId,
          },
          include: [
            {
              model: DB.PermitAssetLists,
              // where: { assetId: assetId },
              attributes: [],
            },
          ],
          attributes: [
            "id",
            "code",
            "typeId",
            "title",
            "description",
            [sequelize.col("permitassetlists.assetId"), "assetId"],
          ],
          raw: true,
          // limit: 5,
        });

        res.send(permitList);
      }
      if (checkpoint === 1) {
        const permitList = await DB.Permit.findAll({
          where: {
            id: facilityId,
          },
          limit: 5,
        });

        res.send(permitList);
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

export const getEmployeeDetails = async (req, res) => {
  try {
    const { empEmailId } = req.body;
    if (!empEmailId || !validator.isEmail(empEmailId)) {
      console.log(validator.isEmail(empEmailId));
      res.status(400).send({
        success: false,
        message: "Bad Request",
        emailIsValid: validator.isEmail(empEmailId),
        data: [],
      });
    } else {
      const result = await DB.EmployeeDetails.findAll({
        where: {
          Emp_Email_id: empEmailId,
        },
        attributes: [
          "Emp_Email_id",
          "Emp_Role_id",
          "Emp_Designation",
          "Emp_Role",
          "id",
        ],
        raw: true,
      });

      if (result.length !== 0) {
        res.status(200).send({
          success: true,
          message: "OK",
          data: result,
        });
      }
      if (result.length === 0) {
        res.status(200).send({
          success: true,
          message: "Not Found",
          data: [],
        });
      }
    }
  } catch (error) {
    res.status(501).send({
      success: false,
      message: error.message,
      data: [],
    });
  }
};

export const jobDetails = async (req, res) => {
  try {
    const { jobId } = req.body;
    const valid = [];
    if (jobId === undefined || jobId < 0) {
      valid.push("Enter Number");
    }
    if (valid.length === 0) {
      const result = await DB.Job.findAll({
        where: {
          id: jobId,
        },
        attributes: ["assignedId", "updatedBy", "createdBy", "belongsTo"],
        raw: true,
      });

      if (result.length === 0) {
        res.status(404).send({
          success: true,
          message: "Not Found",
          data: [],
        });
      }
      if (result.length !== 0) {
        const [{ belongsTo }] = result;

        if (
          belongsTo === linkPermit.JOB_BELONG_TO_PM ||
          belongsTo === linkPermit.JOB_BELONG_TO_PDM
        ) {
          const pmScheduleResult = await DB.pmSchedule.findAll({
            where: {
              id: belongsTo,
            },
            attributes: [["pmMaintenanceOrderNumber", "orderNo"]],
            raw: true,
          });

          res.status(200).send({
            success: true,
            message: "OK",
            data: pmScheduleResult,
          });
        }
        if (
          belongsTo === linkPermit.JOB_BELONG_TO_AUDIT ||
          belongsTo === linkPermit.JOB_BELONG_TO_HOTO
        ) {
          const hoto = await DB.Job.findAll({
            where: { id: jobId },
            include: [
              {
                model: DB.Ticket,
                required: false,
                attributes: [],
                include: [
                  {
                    model: DB.hotoExecution,
                    required: false,
                    attributes: [],
                    include: [
                      {
                        model: DB.hotoSchedule,
                        required: false,
                        attributes: [],
                      },
                    ],
                  },
                ],
              },
            ],
            attributes: [
              "id",
              "belongsTo",
              [sequelize.col("tickets.ticketId"), "Tid"],
              [sequelize.col("tickets.executionId"), "executionId"],
              [sequelize.col("tickets.hotoexecutions.id"), "hotoId"],
              [
                sequelize.col("tickets.hotoexecutions.scheduleId"),
                "scheduleId",
              ],
              [
                sequelize.col("tickets.hotoexecutions.hotoschedules.id"),
                "HOTOscheduleId",
              ],
              [
                sequelize.col(
                  "tickets.hotoexecutions.hotoschedules.planOrderNumber"
                ),
                "HOTOOrderNumber",
              ],
            ],
            raw: true,
          });

          res.status(200).send({
            success: true,
            message: "OK",
            data: hoto,
          });
        }
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Bad Request",
        data: valid,
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
