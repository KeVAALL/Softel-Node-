import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";


const fleximc_emp_competency_list = connection.define("fleximc_emp_competency_lists",{

    Competency_id:DataTypes.STRING,
    Competency_Code:DataTypes.STRING,
    Competency_Name:DataTypes.STRING,
    Competency_Discription:DataTypes.STRING,
    Added_date:DataTypes.DATE,
    Added_by:DataTypes.INTEGER,
    Updated_date:DataTypes.DATE,
    Updated_by:DataTypes.INTEGER,
    Status:DataTypes.INTEGER

},
{
    timestamps: false,
    tableName: 'fleximc_emp_competency_list'
}
);

export default fleximc_emp_competency_list;

