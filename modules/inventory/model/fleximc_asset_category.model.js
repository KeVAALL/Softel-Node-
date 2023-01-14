import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const fleximc_asset_category = connection.define("fleximc_asset_categorys",{
    Asset_Cat_Code:DataTypes.STRING,
    Asset_Cat_Name:DataTypes.STRING,
    Asset_Cat_Discription:DataTypes.STRING,
    Asset_Cat_Added_date:DataTypes.DATE,
    Asset_Cat_Updated_date:DataTypes.DATE,
    Asset_Cat_Status:DataTypes.INTEGER,
    Asset_Calibration_Status:DataTypes.INTEGER,
    Asset_Cat_Added_by:DataTypes.INTEGER,
    Asset_Cat_Update_by:DataTypes.INTEGER
},
{
    
    timestamps: false,
    tableName: 'fleximc_asset_category'
}
);

export default fleximc_asset_category;