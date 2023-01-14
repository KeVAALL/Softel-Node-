import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const  fleximc_asset_type = connection.define("fleximc_asset_types",{
    Asset_Type_Code:DataTypes.STRING,
    Asset_Type_Name:DataTypes.STRING,
    Asset_Type_Discription:DataTypes.STRING,
    Asset_Type_Added_date:DataTypes.DATE,
    Asset_Type_Updated_date:DataTypes.DATE,
    Asset_Type_Status:DataTypes.INTEGER,
    Asset_Type_Added_by:DataTypes.INTEGER,
    Asset_Type_Update_by:DataTypes.INTEGER
},
{
    timestamps: false,
    tableName: 'fleximc_asset_type'
});

export default fleximc_asset_type;