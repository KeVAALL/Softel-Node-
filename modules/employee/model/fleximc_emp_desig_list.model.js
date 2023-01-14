import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const fleximc_emp_desig_list = connection.define("fleximc_emp_desig_lists", {
    Desgnation_id:DataTypes.STRING,
    Desgnation_Code:DataTypes.STRING,
    Desgnation_Name:DataTypes.STRING,
    Desgnation_Discription:DataTypes.STRING,
    Added_date:DataTypes.DATE,
    Added_by:DataTypes.INTEGER,
    Updated_date:DataTypes.DATE,
    Updated_by:DataTypes.INTEGER,
    Status:DataTypes.INTEGER

},
    {
        timestamps: false,
        tableName: 'fleximc_emp_desig_list'
    }
);

export default fleximc_emp_desig_list;
