import DB from "./connection.js";
import { DataTypes, Op } from "sequelize";
import sequelize from "sequelize";

export const formatResult = (result, status_code) => {
  let msg = "";
  if (status_code == 200) msg = "success";

  if (status_code == 500) msg = "failed";

  return {
    status: status_code,
    msg: msg,
    data: result,
  };
};

export const getCurrentTime = (getTimestamp = true) => {
  let current = new Date();
  let dd = current.getDate();
  let mm =
    current.getMonth() + 1 < 10
      ? `0${current.getMonth() + 1}`
      : current.getMonth() + 1;
  let yyyy = current.getFullYear();
  let h = current.getHours();
  let i = current.getMinutes();
  let s = current.getSeconds();
  if (getTimestamp) {
    return `${yyyy}-${mm}-${dd} ${h}:${i}:${s}`;
  }
  return `${yyyy}-${mm}-${dd}`;
};

export const dateIsValid = (dateInput) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateInput.match(regex) === null) {
    return false;
  }
  const date = new Date(dateInput);
  return date instanceof Date && !isNaN(date);
};

function uploadFile(file, uploadPath) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  file.mv(uploadPath, function (err) {
    if (err) {
      return false;
    }
    return true;
  });
}

export const insertComment = async (
  moduleType,
  moduleRefId,
  moduleRefIdSecondary,
  comment,
  postedBy,
  approvalStatus,
  closeCarryForwardStatus,
  currentLat,
  currentLong
) => {
  const insertCommentCreate = await DB.HistoryTable.create({
    moduleType,
    moduleRefId,
    comment,
    moduleRefIdSecondary,
    postedBy,
    approvalStatus,
    closeCarryForwardStatus,
    currentLat,
    currentLong,
  });

  console.log(insertCommentCreate.postedBy);

  const employee = await DB.Employee.findAll({
    where: {
      id: insertCommentCreate.postedBy,
    },
    attributes: ["firstName", "lastName"],
    raw: true,
  });

  console.log(employee);
  let employeeName;

  // const obj = JSON.parse(JSON.stringify(employee));
  // const keys = Object.keys(obj);
  // for (let i = 0; i < keys.length; i++) {
  //   const { firstName, lastName } = obj[keys[i]];

  //   console.log(firstName, lastName);
  const [{ firstName, lastName }] = employee;

  employeeName = { firstName, lastName };
  // }

  return employeeName;

  // console.log(`Auto generated id: ${insertComment.id}`);
};

export const getEmployeeFullName = async (empId) => {
  const empFullName = await DB.EmployeeDetails.findAll({
    where: {
      Emp_user_id: empId,
    },
    attributes: ["Emp_First_Name", "Emp_Last_Name"],
    raw: true,
  });

  return empFullName;
};

export const getHistoryDetails = async (moduleType, moduleRefId) => {
  const historyDetails = await DB.Employee.findAll({
    // where: {
    //   $and: [
    //     { "$historyTable.moduleType$": moduleType },
    //     { "$historyTable.moduleRefId$": moduleRefId },
    //   ],
    // },
    include: [
      {
        model: DB.HistoryTable,
        where: { [Op.and]: [{ moduleType, moduleRefId }] },
        attributes: [],
      },
    ],
    // Stores all nested array values inside on single array
    attributes: [
      "firstName",
      "lastName",
      [sequelize.col("historyTables.id"), "id"],
      [sequelize.col("historyTables.moduleType"), "moduleType"],
      [sequelize.col("historyTables.moduleRefId"), "moduleRefId"],
      [sequelize.col("historyTables.postedBy"), "postedBy"],
      [sequelize.col("historyTables.comment"), "comment"],
      [sequelize.col("historyTables.addedTimeStamp"), "addedTimeStamp"],
    ],
    raw: true,
  });

  return historyDetails;

  // let HistoryDetails;

  // const obj = JSON.parse(JSON.stringify(historyDetails));

  // console.log(historyDetails);

  // const keys = Object.keys(obj);
  // console.log(keys.length);
  // let emp;
  // for (let i = 0; i < keys.length; i++) {
  //   // const { comment, postedBy } = obj[keys[i]];
  //   const {
  //     firstName,
  //     lastName,
  //     id,
  //     moduleType,
  //     moduleRefId,
  //     postedBy,
  //     comment,
  //   } = obj[keys[i]];

  //   // console.log(comment);

  //   emp = {
  //     firstName,
  //     lastName,
  //     id,
  //     moduleType,
  //     moduleRefId,
  //     postedBy,
  //     comment,
  //   };
  // }

  // HistoryDetails = emp;
  // return HistoryDetails;

  // const employee = await Employee.findAll({
  //   where: {
  //     id: HistoryDetails.postedBy,
  //   },
  //   attributes: ["firstName", "lastName"],
  // });

  // let empHistoryDetails;

  // const object = JSON.parse(JSON.stringify(employee));

  // const key = Object.keys(object);

  // for (let i = 0; i < key.length; i++) {
  //   const { firstName, lastName } = object[key[i]];

  //   empHistoryDetails = { ...HistoryDetails, firstName, lastName };
  // }

  // return empHistoryDetails;
};

export const getEmployeeList = (jcId) => {
  DB.EmployeeList.findAll({
    where: {
      jcId: jcId,
    },
  });
};
