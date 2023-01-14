export default (connection, DataTypes) => {
  return connection.define(
    "EmployeeDetails",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Emp_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Emp_user_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Nick_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_First_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Last_Name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Designation: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Designation_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Job_Code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Job_Code_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Remarks: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Joining_Date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Added_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Added_by: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_update_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_update_by: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // Emp_Address: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
      Emp_mob_num: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Email_id: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_land_line: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Alt_number: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_Photo_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Alt_Email_id: DataTypes.STRING,
      Emp_Facility_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Emp_Facility_Code: DataTypes.STRING,
      Emp_Facility_name: DataTypes.STRING,
      Emp_Job_Code_Name: DataTypes.STRING,
      Emp_Designation_code: DataTypes.STRING,
      Emp_Role_Code: DataTypes.STRING,
      Emp_S_No: DataTypes.STRING,
      Emp_Selected_Job_Type: {
        type: DataTypes.STRING,
        defaultValue: "BM",
      },
      Emp_Selected_JobCard_Type: {
        type: DataTypes.STRING,
        defaultValue: "BM",
      },
      Emp_PM_Pending_Required: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0,
      },
      Emp_on_site: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: false,
    }
  );
};
