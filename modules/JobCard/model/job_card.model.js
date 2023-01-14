export default (connection, DataTypes) => {
  return connection.define(
    "JobCard",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      JC_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      JC_code: DataTypes.STRING,
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PTW_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ptw_code: DataTypes.STRING,
      JC_title: DataTypes.STRING,
      JC_Description: DataTypes.TEXT,
      JC_Done_Description: DataTypes.TEXT,
      JC_Date_Start: DataTypes.DATE,
      JC_Date_Stop: DataTypes.DATE,
      JC_Start_By_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      JC_Start_By_Code: DataTypes.STRING,
      JC_Start_By_Name: DataTypes.STRING,
      JC_End_By_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      JC_End_By_Code: DataTypes.STRING,
      JC_End_By_Name: DataTypes.STRING,
      JC_Issued_By_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      JC_Issued_By_Code: DataTypes.STRING,
      JC_Issued_By_Name: DataTypes.STRING,
      JC_Approved_By_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      JC_Approved_By_Code: DataTypes.STRING,
      JC_Approved_By_Name: DataTypes.STRING,
      JC_Approved: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      JC_Rejected_By_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      JC_Rejected_Reason: DataTypes.TEXT,
      JC_Rejected_TimeStamp: DataTypes.TIME,
      JC_Rejected_By_Name: DataTypes.STRING,
      JC_Status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      JC_Carry_Forward: DataTypes.INTEGER,
      JC_Date: DataTypes.DATE,
      JC_Added_by: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      JC_Added_Date: DataTypes.DATE,
      JC_Update_by: DataTypes.STRING,
      JC_Update_date: DataTypes.DATE,
      Facility_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Facility_Code: DataTypes.STRING,
      Facility_Name: DataTypes.STRING,
      JC_TimeZone: {
        type: DataTypes.STRING,

        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
