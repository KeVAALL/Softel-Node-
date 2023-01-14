import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";


const fleximc_cmms_log = connection.define("fleximc_cmms_logs",{
	Module_Name:DataTypes.STRING,
    Data_ID:DataTypes.INTEGER,
    Old_Data:DataTypes.STRING,
    New_Data:DataTypes.STRING,
    Updated_Field_Name:DataTypes.STRING,
    Updated_By:DataTypes.INTEGER,
    Updated_Date:DataTypes.DATE,
    IP_Address:DataTypes.STRING,
    User_Agent:DataTypes.STRING

},
{
    timestamps: false,
    tableName: 'fleximc_cmms_log'
});

export default fleximc_cmms_log;