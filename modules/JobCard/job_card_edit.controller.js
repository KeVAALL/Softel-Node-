import { Op, Sequelize, where } from "sequelize";
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
  buttonStatus,
} from "../../utility/constant.js";

import {
  insertComment,
  getHistoryDetails,
  getEmployeeFullName,
} from "../../utility/common.js";

import DB from "../../utility/connection.js";

export const UpdateApproveJobCard = (req, res) => {
  // CHecked
  const {
    moduleRefId,
    moduleRefIdSecondary,
    comment,
    postedBy,
    closeCarryForwardStatus,
  } = req.body;

  insertComment(
    moduleConstant.JOBCARD,
    moduleRefId,
    moduleRefIdSecondary,
    comment,
    postedBy,
    JC_APPROVE,
    closeCarryForwardStatus
  );

  DB.JobCard.update(
    { JC_Status: JC_APPROVE },
    {
      where: {
        id: moduleRefId,
      },
    }
  ).then((result) => {
    res.send("Updated!");
  });
};

export const UpdateRejectJobCard = (req, res) => {
  const { moduleRefId, comment, postedBy, closeCarryForwardStatus } = req.body;

  if (!comment) {
    insertComment(
      moduleConstant.JOBCARD,
      moduleRefId,
      0,
      comment,
      postedBy,
      JC_REJECT,
      closeCarryForwardStatus
    );
  }

  getEmployeeFullName(postedBy)
    .then((result) => {
      console.log(result);
      const [{ Emp_First_Name, Emp_Last_Name }] = result;
      // console.log(Emp_First_Name, Emp_Last_Name);

      return `${Emp_First_Name} ${Emp_Last_Name}`;

      // console.log(empFullName.name);
    })
    .then((empFullName) => {
      console.log(empFullName);
      DB.JobCard.update(
        {
          JC_Status: JC_REJECT,
          JC_Rejected_By_Id: postedBy,
          JC_Rejected_By_Name: empFullName,
          JC_Rejected_Reason: comment,
        },
        {
          where: {
            id: moduleRefId,
          },
        }
      ).then(() => {
        res.send("Completed!");
      });
    });
};

export const Update = (req, res) => {
  const { jobCardId, empId, currentTime, jcCarryForward } = req.body;

  if (jobCardId) {
    DB.JobCard.update(
      {
        JC_Update_by: empId,
        JC_Update_date: currentTime,
        JC_Carry_Forward: jcCarryForward,
        JC_Status: JC_CLOSE,
      },
      {
        where: {
          id: jobCardId,
        },
      }
    );
  } else {
    // For empty jobcard
    if (!jobCardId) {
    } else {
      if (updateJobCard === buttonStatus.JC_UPDATE_BUTTON) {
        // Set InsertFlag to True
      } else if (updateJobCard === buttonStatus.JC_SUBMIT_BUTTON) {
        DB.JobCard.update(
          {
            JC_Status: JC_CLOSE,
            JC_Carry_Forward: jcCarryForward,
          },
          {
            where: {
              id: jobCardId,
            },
          }
        );
      } else {
        // Update Front-End
      }
    }
  }
};
