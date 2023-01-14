import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const fleximc_asset_category_checklist = connection.define("fleximc_asset_category_checklists",{
    Asset_Category_id:DataTypes.INTEGER,
    Asset_Category_name:DataTypes.STRING,
    Asset_Category_Parameter_title:DataTypes.STRING,
    Asset_Category_Parameter_id:DataTypes.STRING,
    Asset_Category_discription:DataTypes.STRING,
    Asset_Category_Measure_input:DataTypes.INTEGER,
    Asset_Category_Measure_input_name:DataTypes.STRING,
    Added_date:DataTypes.DATE,
    Added_by:DataTypes.INTEGER,
    Update_by:DataTypes.INTEGER,
    Update_date:DataTypes.DATE,
    Status:DataTypes.INTEGER,
    Parameter_Minvalue:DataTypes.INTEGER,
    Parameter_Maxvalue:DataTypes.INTEGER,
    Parameter_Idealvalue:DataTypes.INTEGER    

},
{
    
    timestamps: false,
    tableName: 'fleximc_asset_category_checklist'
}
);

export default fleximc_asset_category_checklist;
