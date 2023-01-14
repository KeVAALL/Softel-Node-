import { runQuery } from "../../../utility/db-operation.js";
import { SELECT } from "../../../utility/constant.js";

/*To get Asset List */
export const equipmentList = async (req, res) => {
  const facility_id = req.params.FacilityId;
  const category_id = req.params.EquipmentCategoryId;
  const sql = `SELECT asset_id,asset_name FROM FlexiMC_Asset 
                    WHERE Asset_Facility_id= ${facility_id} AND asset_category_id = ${category_id} AND Status = '1'`;
  const result = await runQuery(SELECT, sql);
  res.send(result);
};

/*To get Asset Category List */
export const categoryList = async (req, res) => {
  const facility_id = req.params.FacilityId;
  const sql = `SELECT id as category_id, Asset_Cat_Name 
                    FROM fleximc_asset_category as category 
                    JOIN fleximc_asset as asset ON category.id = asset.asset_category_id 
                    WHERE asset.status = '1' AND category.Asset_Cat_Status = '1' AND asset.asset_facility_id = ${facility_id} GROUP BY category.id`;
  const result = await runQuery(SELECT, sql);
  res.send(result);
};


import { DataTypes, Op, QueryTypes, Sequelize } from "sequelize";
import { getCurrentTime } from "../../../utility/common.js";

import fleximc_asset_category_checklist from "../model/fleximc_asset_category_checklist.model.js";
import fleximc_cmms_log from "../../log/model/fleximc_cmms_log.model.js";
import fleximc_asset_category from "../model/fleximc_asset_category.model.js";
import fleximc_asset_type from "../model/fleximc_asset_type.model.js";

export const CategoryCheckListAdd = async (req, res) => {

  const {
    Asset_category, parameter1, Description, confimation, Added_date, Added_by, Update_date,
    Status, Max, Min, Ideal,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date, IP_Address, User_Agent
  } = req.body;


  if (Asset_category) {
    var Category = Asset_category.split('-');
    console.log(Category);
    var cat_id = Category[0];
    var cat_name = Category[1];

  }

  if (parameter1) {
    var para = parameter1.split(',');
    console.log(para);
    var para_id = para[0];
    var para_name = para[1];
  }

  if (confimation) {
    var conform = confimation.split('-');
    console.log(conform);
    var con_id = conform[0];
    var con_name = conform[1];
  }

  if (Max) {
    var Max_value = 1;
  }
  else {
    var Max_value = 0;
  }
  if (Min) {
    var Min_value = 1;
  }
  else {
    var Min_value = 0;
  }

  if (Ideal) {
    var Ideal_value = 1;
  }
  else {
    var Ideal_value = 0;
  }

  let arr = [];


  const resultAssetCategory = await fleximc_asset_category_checklist.create({
    Asset_Category_id: cat_id,
    Asset_Category_name: cat_name,
    Asset_Category_Parameter_title: para_name,
    Asset_Category_Parameter_id: para_id,
    Asset_Category_discription: Description,
    Asset_Category_Measure_input: con_id,
    Asset_Category_Measure_input_name: con_name,
    Added_date: Added_date,
    Added_by: Added_by,
    Update_date: Update_date,
    Status: Status,
    Parameter_Minvalue: Min_value,
    Parameter_Maxvalue: Max_value,
    Parameter_Idealvalue: Ideal_value
  });

  let Assetcategory = [{
    id: resultAssetCategory.id,
    Asset_Category_id: resultAssetCategory.Asset_Category_id,
    Asset_Category_name: resultAssetCategory.Asset_Category_name,
    Asset_Category_Parameter_title: resultAssetCategory.Asset_Category_Parameter_title,
    Asset_Category_Parameter_id: resultAssetCategory.Asset_Category_Parameter_id,
    Asset_Category_discription: resultAssetCategory.Asset_Category_discription,
    Asset_Category_Measure_input: resultAssetCategory.Asset_Category_Measure_input,
    Asset_Category_Measure_input_name: resultAssetCategory.Asset_Category_Measure_input_name,
    Added_date: resultAssetCategory.Added_date,
    Added_by: resultAssetCategory.Added_by,
    Update_date: resultAssetCategory.Update_date,
    Status: resultAssetCategory.Status,
    Parameter_Minvalue: resultAssetCategory.Parameter_Minvalue,
    Parameter_Maxvalue: resultAssetCategory.Parameter_Maxvalue,
    Parameter_Idealvalue: resultAssetCategory.Parameter_Idealvalue
  }];

  arr.push(Assetcategory);

  const resultCmslog = await fleximc_cmms_log.create({
    Module_Name: Module_Name,
    Data_ID: resultAssetCategory.id,
    Old_Data: Old_Data,
    New_Data: New_Data,
    Updated_Field_Name: Updated_Field_Name,
    Updated_By: Updated_By,
    Updated_Date: Updated_Date,
    IP_Address: IP_Address,
    User_Agent: User_Agent
  });

  let cmslog = [{
    id: resultCmslog.id,
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
  arr.push(cmslog);

  res.send(arr);

};

export const CategoryCheckListEdit = async (req, res) => {
  console.log("CategoryCheckListEdit");

  const { id, module_name, part_of, max, min, ideal, Update_date,
    Module_Name,Data_ID,Old_Data,New_Data,Updated_Field_Name,Updated_By,
    Updated_Date,IP_Address,User_Agent
  
  } = req.body;

  console.log(id, module_name, part_of, max, min, ideal);
  let part_of_main = part_of.split('-');

  let Module_part_of_id = part_of_main[0];
  let Module_part_of_Name = part_of_main[1];

  if (max) {
    var Max_value = 1;
  }
  else {
    var Max_value = 0;
  }
  if (min) {
    var Min_value = 1;
  }
  else {
    var Min_value = 0;
  }

  if (ideal) {
    var Ideal_value = 1;
  }
  else {
    var Ideal_value = 0;
  }


  const resultAssetCategory = await fleximc_asset_category_checklist.update({
    Asset_Category_Parameter_title: module_name,
    Parameter_Maxvalue: Max_value,
    Parameter_Minvalue: Min_value,
    Parameter_Idealvalue: Ideal_value,
    Asset_Category_id: Module_part_of_id,
    Asset_Category_name: Module_part_of_Name,
    Update_date: Update_date

  }, {
    where: { id: id },
  });



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

export const CategoryCheckListDel = async(req,res)=>{

 
  const {id,Status,Update_date,Module_Name,Data_ID,Old_Data,New_Data,Updated_Field_Name,
    Updated_By,Updated_Date,IP_Address,User_Agent
  } = req.body;

  console.log(id,Status,Update_date);
  
  const resultAssetCategory = await fleximc_asset_category_checklist.update({
    Status:Status,
    Update_date:Update_date
  },{
    where: { id: id },
  });


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




export const categoryAdd = async (req, res) => {

  const { Asset_Cat_Name, Asset_Cat_Status, Asset_Calibration_Status,
    Asset_Cat_Discription, Asset_Cat_Added_date, Asset_Cat_Added_by, Asset_Cat_Code,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date,
    IP_Address, User_Agent

  } = req.body;

  const resultAssetCategoryAdd = await fleximc_asset_category.create({
    Asset_Cat_Name: Asset_Cat_Name,
    Asset_Cat_Status: Asset_Cat_Status,
    Asset_Calibration_Status: Asset_Calibration_Status,
    Asset_Cat_Discription: Asset_Cat_Discription,
    Asset_Cat_Added_date: Asset_Cat_Added_date,
    Asset_Cat_Added_by: Asset_Cat_Added_by,
    Asset_Cat_Code: Asset_Cat_Code

  });

  let arr = [];

  let assetCategory = [{
    id: resultAssetCategoryAdd.id,
    Asset_Cat_Name: resultAssetCategoryAdd.Asset_Cat_Name,
    Asset_Cat_Status: resultAssetCategoryAdd.Asset_Cat_Status,
    Asset_Calibration_Status: resultAssetCategoryAdd.Asset_Calibration_Status,
    Asset_Cat_Discription: resultAssetCategoryAdd.Asset_Cat_Discription,
    Asset_Cat_Added_date: resultAssetCategoryAdd.Asset_Cat_Added_date,
    Asset_Cat_Added_by: resultAssetCategoryAdd.Asset_Cat_Added_by,
    Asset_Cat_Code: resultAssetCategoryAdd.Asset_Cat_Code
  }];

  arr.push(assetCategory);
  const resultCmslog = await fleximc_cmms_log.create({
    Module_Name: Module_Name,
    Data_ID: resultAssetCategoryAdd.id,
    Old_Data: Old_Data,
    New_Data: New_Data,
    Updated_Field_Name: Updated_Field_Name,
    Updated_By: Updated_By,
    Updated_Date: Updated_Date,
    IP_Address: IP_Address,
    User_Agent: User_Agent
  });

  let cmslog = [{
    id: resultCmslog.id,
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
  arr.push(cmslog);

  res.send(arr);


}

export const categoryEdit = async (req, res) => {

  console.log("categoryEdit");
  const { id, Asset_Cat_Name, Asset_Cat_Status, Asset_Calibration_Status,
    Asset_Cat_Discription, Asset_Cat_Added_date, Asset_Cat_Added_by, Asset_Cat_Code,
    cmsLogId, Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By,
    Updated_Date, IP_Address, User_Agent

  } = req.body;

  const resultAssetCategoryEdit = await fleximc_asset_category.update(
    {
      Asset_Cat_Name: Asset_Cat_Name,
      Asset_Cat_Status: Asset_Cat_Status,
      Asset_Calibration_Status: Asset_Calibration_Status,
      Asset_Cat_Discription: Asset_Cat_Discription,
      Asset_Cat_Added_date: Asset_Cat_Added_date,
      Asset_Cat_Added_by: Asset_Cat_Added_by,
      Asset_Cat_Code: Asset_Cat_Code
    },
    {
      where: { id: id },
    }
  );


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
export const categoryDel = async (req, res) => {

  console.log("categoryDel");

  const { id, Asset_Cat_Status, Asset_Cat_Updated_date,
    Asset_Cat_Update_by, Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By,
    Updated_Date, IP_Address, User_Agent
  } = req.params;

  const resultAssetCategoryDel = await fleximc_asset_category.update(
    {
      Asset_Cat_Status: Asset_Cat_Status,
      Asset_Cat_Updated_date: Asset_Cat_Updated_date,
      Asset_Cat_Update_by: Asset_Cat_Update_by,

    },
    {
      where: { id: id },
    }
  );

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

export const assetTypeAdd = async (req, res) => {
  console.log("assetType");
  const { Asset_Type_Name, Asset_Type_Status, Asset_Type_Discription,
    Asset_Type_Updated_date, Asset_Type_Added_by, Asset_Type_Code,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name,
    Updated_By, Updated_Date, IP_Address, User_Agent
  } = req.body;

  const resultAssetTypeAdd = await fleximc_asset_type.create({
    Asset_Type_Name: Asset_Type_Name,
    Asset_Type_Status: Asset_Type_Status,
    Asset_Type_Discription: Asset_Type_Discription,
    Asset_Type_Updated_date: Asset_Type_Updated_date,
    Asset_Type_Added_by: Asset_Type_Added_by,
    Asset_Type_Code: Asset_Type_Code
  });

  let arr = [];
  let assetType = [{
    id: resultAssetTypeAdd.id,
    Asset_Type_Name: resultAssetTypeAdd.Asset_Type_Name,
    Asset_Type_Status: resultAssetTypeAdd.Asset_Type_Status,
    Asset_Type_Discription: resultAssetTypeAdd.Asset_Type_Discription,
    Asset_Type_Updated_date: resultAssetTypeAdd.Asset_Type_Updated_date,
    Asset_Type_Added_by: resultAssetTypeAdd.Asset_Type_Added_by,
    Asset_Type_Code: resultAssetTypeAdd.Asset_Type_Code
  }];

  arr.push(assetType);
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

  let cmslog = [{
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

  arr.push(cmslog);
  res.send(arr);

}

export const assetTypeEdit = async (req, res) => {

  const { id, Asset_Type_Name, Asset_Type_Status, Asset_Type_Discription,
    Asset_Type_Updated_date, Asset_Type_Update_by,Module_Name,Data_ID,Old_Data,
    New_Data,Updated_Field_Name,Updated_By,Updated_Date,IP_Address,User_Agent
  } = req.body;

  const resultAssetTypeEdit = await fleximc_asset_type.update(
    {
      Asset_Type_Name: Asset_Type_Name,
      Asset_Type_Status: Asset_Type_Status,
      Asset_Type_Discription: Asset_Type_Discription,
      Asset_Type_Updated_date: Asset_Type_Updated_date,
      Asset_Type_Update_by: Asset_Type_Update_by
    },
    {
      where: { id: id },
    }
  );

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

export const assetTypeDel = async (req, res) => {

  const { id, Asset_Type_Status, Asset_Type_Updated_date, Asset_Type_Update_by,
    Module_Name, Data_ID, Old_Data, New_Data, Updated_Field_Name, Updated_By, Updated_Date,
    IP_Address, User_Agent

  } = req.body;

  const resultAssetTypeDel = await fleximc_asset_type.update(
    {

      Asset_Type_Status: Asset_Type_Status,
      Asset_Type_Updated_date: Asset_Type_Updated_date,
      Asset_Type_Update_by: Asset_Type_Update_by
    },
    {
      where: { id: id },
    }
  );

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




