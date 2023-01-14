import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const fleximc_emp_role_list = connection.define("fleximc_emp_role_lists", {
    Role_id: { type: DataTypes.STRING, defaultValue: "NULL" },
    Role_Code: { type: DataTypes.STRING, defaultValue: "NULL" },
    Role_Name: { type: DataTypes.STRING, defaultValue: "NULL" },
    Role_Discription: { type: DataTypes.STRING, defaultValue: "NULL" },
    Added_date: { type: DataTypes.DATE, defaultValue: "NULL" },
    Added_by: { type: DataTypes.INTEGER, defaultValue: 0 },
    Updated_date: { type: DataTypes.DATE, defaultValue: "NULL" },
    Updated_by: { type: DataTypes.INTEGER, defaultValue: 0 },
    Status: { type: DataTypes.INTEGER, defaultValue: 0 }

},
    {
        timestamps: false,
        tableName: 'fleximc_emp_role_list'
    }
);

export default fleximc_emp_role_list;
