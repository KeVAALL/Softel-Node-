import { runQuery } from "../../../utility/db-operation.js";
import { SELECT } from "../../../utility/constant.js";
// import employee from "../model/model-employee.js";

/*To get Employee List Based On Facility */
export const assignEmployeeList =async (req, res) => {
  let facility_id = req.params.FacilityId;
  let sql = `SELECT emp.id as Employee_id, emp.Emp_First_Name, emp.Emp_Last_Name, emp.Emp_Role, emp.Emp_Designation
               FROM fleximc_emp_details as emp 
               JOIN fleximc_emp_details_facility as emp_fac ON emp.id = emp_fac.emp_id 
               WHERE emp.Emp_Status = 1 AND emp_fac.Emp_Status = 1 AND emp_Fac.Emp_Facility_id = ${facility_id}`;
  const result = await runQuery(SELECT, sql);
  res.send(result);
};

export const getAllEmp = async (req, res)=>{
  try {
    const data = await employee.findAll();
    res.send(data);  
  } catch (error) {
    console.log(`Error : ${error}`);
  }
  
}



import { DataTypes, Op, QueryTypes, Sequelize } from "sequelize";
import { getCurrentTime } from "../../../utility/common.js";


import fleximc_emp_role_list from "../model/fleximc_emp_role_list.model.js";
import fleximc_cmms_log from "../../log/model/fleximc_cmms_log.model.js";

import fleximc_emp_desig_list from "../model/fleximc_emp_desig_list.model.js";

import fleximc_emp_competency_list from "../model/fleximc_emp_competency_list.model.js";

export const roleAdd = async (req, res) => {

  const { Role_Name, Status, Role_Discription, Added_date, Added_by, Role_Code,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date,
    IP_Address, User_Agent
  } = req.body;

  const resultRoleAdd = await fleximc_emp_role_list.create({
    Role_Name: Role_Name,
    Status: Status,
    Role_Discription: Role_Discription,
    Added_date: Added_date,
    Added_by: Added_by,
    Role_Code: Role_Code
  });

  if (resultRoleAdd) {

    let arr = [];

    let roleAdd = [{
      Role_Name: resultRoleAdd.Role_Name,
      Status: resultRoleAdd.Status,
      Role_Discription: resultRoleAdd.Role_Discription,
      Added_date: resultRoleAdd.Added_date,
      Added_by: resultRoleAdd.Added_by,
      Role_Code: resultRoleAdd.Role_Code
    }];

    arr.push(roleAdd);

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: resultRoleAdd.id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    let cmsLog = [{
      Module_Name: resultCmslog.Module_Name,
      Data_ID: resultCmslog.Data_ID,
      Old_Data: resultCmslog.Old_Data,
      New_Data: resultCmslog.New_Data,
      Updated_Field_Name: resultCmslog.Updated_Field_Name,
      Updated_By: resultCmslog.Updated_By,
      Updated_Date: resultCmslog.Updated_Date,
      IP_Address: resultCmslog.IP_Address,
      User_Agent: resultCmslog.User_Agent
    }];

    arr.push(cmsLog);

    res.send(arr);

  }

}

export const roleEdit = async (req, res) => {

  const { id, Role_Name, Status, Role_Discription, Updated_date, Updated_by,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date,
    IP_Address, User_Agent

  } = req.body;

  const resultRoleEdit = await fleximc_emp_role_list.update({
    Role_Name: Role_Name,
    Status: Status,
    Role_Discription: Role_Discription,
    Updated_date: Updated_date,
    Updated_by: Updated_by
  }, {
    where: { id: id },
  });

  if (resultRoleEdit) {

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    res.send(resultCmslog);
  }

}
export const roleDel = async (req, res) => {

  const { id, Status, Updated_date, Updated_by, Module_Name, Data_ID, Old_Data,
    New_Data, Updated_Field_Name, Updated_By, Updated_Date, IP_Address, User_Agent
  } = req.body;
  console.log(id, Status, Updated_date, Updated_by);

  const resultRoleDel = await fleximc_emp_role_list.update({
    Status: Status,
    Updated_date: Updated_date,
    Updated_by: Updated_by
  }, {
    where: { id: id },
  });


  if (resultRoleDel) {

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });
    res.send(resultCmslog);
  }



}

export const designationAdd = async (req, res) => {

  const { Desgnation_Name, Status, Desgnation_Discription,
    Added_date, Added_by, Desgnation_Code, Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name,
    Updated_By, Updated_Date, IP_Address, User_Agent

  } = req.body;

  const resultDesignAdd = await fleximc_emp_desig_list.create({
    Desgnation_Name: Desgnation_Name,
    Status: Status,
    Desgnation_Discription: Desgnation_Discription,
    Added_date: Added_date,
    Added_by: Added_by,
    Desgnation_Code: Desgnation_Code

  });

  if (resultDesignAdd) {
    let arr = [];
    let designAdd = [{
      Desgnation_Name: resultDesignAdd.Desgnation_Name,
      Status: resultDesignAdd.Status,
      Desgnation_Discription: resultDesignAdd.Desgnation_Discription,
      Added_date: resultDesignAdd.Added_date,
      Desgnation_Code: resultDesignAdd.Desgnation_Code
    }];

    arr.push(designAdd);

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: resultDesignAdd.id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    let cmsLog = [{
      Module_Name: resultCmslog.Module_Name,
      Data_ID: resultCmslog.Data_ID,
      Old_Data: resultCmslog.Old_Data,
      New_Data: resultCmslog.New_Data,
      Updated_Field_Name: resultCmslog.Updated_Field_Name,
      Updated_By: resultCmslog.Updated_By,
      Updated_Date: resultCmslog.Updated_Date,
      IP_Address: resultCmslog.IP_Address,
      User_Agent: resultCmslog.User_Agent
    }];

    arr.push(cmsLog);

    res.send(arr);

  }

}

export const designationEdit = async (req, res) => {

  const { id, Desgnation_Name, Status, Desgnation_Discription, Updated_date, Updated_by,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date,
    IP_Address, User_Agent
  } = req.body;

  const resultDesignEdit = await fleximc_emp_desig_list.update({
    Desgnation_Name: Desgnation_Name,
    Status: Status,
    Desgnation_Discription: Desgnation_Discription,
    Updated_date: Updated_date,
    Updated_by: Updated_by
  }, {
    where: { id: id },

  });


  if (resultDesignEdit) {

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    res.send(resultCmslog);
    
  }


}

export const designationDel = async (req, res) => {

  const { id, Status, Updated_date, Updated_by, Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name,
    Updated_By, Updated_Date, IP_Address, User_Agent

  } = req.body;

  console.log(id, Status, Updated_date, Updated_by);

  const resultDesignEdit = await fleximc_emp_desig_list.update({
    Status: Status,
    Updated_date: Updated_date,
    Updated_by: Updated_by
  }, {
    where: { id: id },

  });

  if (resultDesignEdit) {
    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    res.send(resultCmslog);


  }

}

export const competencyAdd = async (req, res) => {

  const { Competency_Code, Competency_Name, Competency_Discription, Added_date,
    Added_by, Updated_date, Updated_by, Status, Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name,
    Updated_By, Updated_Date, IP_Address, User_Agent, Competency_id

  } = req.body;

  const resultCompetencyAdd = await fleximc_emp_competency_list.create({
    Competency_Code: Competency_Code,
    Competency_Name: Competency_Name,
    Competency_Discription: Competency_Discription,
    Added_date: Added_date,
    Updated_date: Updated_date,
    Updated_by: Updated_by,
    Status: Status
  });

  if (resultCompetencyAdd) {
    let arr = [];
    let competencyAdd = [{
      Competency_Code: resultCompetencyAdd.Competency_Code,
      Competency_Name: resultCompetencyAdd.Competency_Name,
      Competency_Discription: resultCompetencyAdd.Competency_Discription,
      Added_date: resultCompetencyAdd.Added_date,
      Updated_date: resultCompetencyAdd.Updated_date,
      Updated_by: resultCompetencyAdd.Updated_by,
      Status: resultCompetencyAdd.Status
    }];

    arr.push(competencyAdd);

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: resultCompetencyAdd.id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });
    let cmsLog = [{
      Module_Name: resultCmslog.Module_Name,
      Data_ID: resultCmslog.Data_ID,
      Old_Data: resultCmslog.Old_Data,
      New_Data: resultCmslog.New_Data,
      Updated_Field_Name: resultCmslog.Updated_Field_Name,
      Updated_By: resultCmslog.Updated_By,
      Updated_Date: resultCmslog.Updated_Date,
      IP_Address: resultCmslog.IP_Address,
      User_Agent: resultCmslog.User_Agent
    }];

    arr.push(cmsLog);

    res.send(arr);

    const resultCompetencyUpdate = await fleximc_emp_competency_list.update({
      Competency_id: resultCompetencyAdd.id

    }, {

      where: { id: resultCompetencyAdd.id },

    });

  }

}

export const competencyEdit = async (req, res) => {
  console.log("competencyEdit");

  const { id, Competency_Name, Competency_Code, Updated_date, Updated_by,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date,
    IP_Address, User_Agent
  } = req.body;


  const resultCompetencyUpdate = await fleximc_emp_competency_list.update({
    Competency_Name: Competency_Name,
    Competency_Code: Competency_Code,
    Updated_date: Updated_date,
    Updated_by: Updated_by
  }, {

    where: { id: id },

  });

  if(resultCompetencyUpdate){

    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    res.send(resultCmslog);

  }

}
export const competencyDel = async (req, res) => {
  console.log("competencyDel");

  const { id, Status, Added_date, Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By,
    Updated_Date,IP_Address, User_Agent
  } = req.body;

  const resultCompetencyUpdate = await fleximc_emp_competency_list.update({
    Status: Status,
    Added_date: Added_date
  }, {

    where: { id: id },

  });

  if(resultCompetencyUpdate){
    
    const resultCmslog = await fleximc_cmms_log.create({
      Module_Name: Module_Name,
      Data_ID: id,
      Old_Data: Old_Data,
      New_Data: New_Data,
      Updated_Field_Name: Updated_Field_Name,
      Updated_By: Updated_By,
      Updated_Date: Updated_Date,
      IP_Address: IP_Address,
      User_Agent: User_Agent
    });

    res.send(resultCmslog);

  }

}







