
import { DataTypes } from "sequelize";
import dataTypes from "sequelize-mysql-set-timezone-fix/lib/data-types.js";
import connection from "../../utility/connection.js";

const FlexiMC_File = connection.define("Fleximc_Files",{

    File_Belongs_to:DataTypes.STRING,
    Facility_id:DataTypes.INTEGER,
    Facility_Code:DataTypes.STRING,
    Facility_name:DataTypes.STRING,
    Asset_id:DataTypes.INTEGER,
    Asset_Code:DataTypes.STRING,
    Asset_name:DataTypes.STRING,
    Emp_id:DataTypes.INTEGER,
    Emp_Code:DataTypes.STRING,
    Emp_name:DataTypes.STRING,
    PTW_id:DataTypes.INTEGER,
    PTW_Code:DataTypes.STRING,
    PTW_Name:DataTypes.STRING,
    JC_id:DataTypes.INTEGER,
    JC_Code:DataTypes.STRING,
    JC_Name:DataTypes.STRING,
    TBT_id:DataTypes.INTEGER,
    TBT_Code:DataTypes.STRING,
    TBT_Name:DataTypes.STRING,
    Business_id:DataTypes.INTEGER,
    Business_Code:DataTypes.STRING,
    Business_Name:DataTypes.STRING,
    File_id:DataTypes.INTEGER,
    File_Code:DataTypes.STRING,
    File_Name:DataTypes.STRING,
    File_Name_Changed:DataTypes.STRING,
    File_Discription:DataTypes.STRING,
    File_Path:DataTypes.STRING,
    File_Server_id:DataTypes.INTEGER,
    File_Server_Path:DataTypes.STRING,
    File_Preview_path:DataTypes.STRING,
    File_Type_id:DataTypes.INTEGER,
    File_Type_name:DataTypes.STRING,
    File_Type_ext:DataTypes.STRING,
    File_Category_id:DataTypes.INTEGER,
    File_Category_name:DataTypes.STRING,
    File_Category_Code:DataTypes.STRING,
    File_added_by:DataTypes.INTEGER,
    File_added_date:DataTypes.DATE,
    File_updated_by:DataTypes.INTEGER,
    File_updated_date:DataTypes.DATE,
    File_Size:DataTypes.STRING,
    File_Size_bytes:DataTypes.DOUBLE,
    Status:DataTypes.INTEGER,
    Access_Emp_id:DataTypes.INTEGER,
    Access_Emp_Code:DataTypes.STRING,
    Access_Emp_Name:DataTypes.STRING,
    HAZOB_id:DataTypes.INTEGER,
    HAZOB_Code:DataTypes.STRING,
    HAZOB_Title:DataTypes.STRING,
    Current_lat:DataTypes.STRING,
    Current_long:DataTypes.STRING,
    JMR_id:DataTypes.INTEGER

});


export default FlexiMC_File;










