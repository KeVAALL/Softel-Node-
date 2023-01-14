export default (connection, DataTypes) => {
  return connection.define(
    "JobCardFiles",
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
      JC_title: DataTypes.STRING,
      Facility_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Facility_Name: DataTypes.STRING,
      Facility_Code: DataTypes.STRING,
      File_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      File_Code: DataTypes.STRING,
      File_Name: DataTypes.STRING,
      File_Description: DataTypes.TEXT,
      File_Path: DataTypes.STRING,
      File_Server_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      File_Server_Path: DataTypes.STRING,
      File_Preview_Path: DataTypes.STRING,
      File_Type_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      File_Type_Name: DataTypes.STRING,
      File_Category_Id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      File_Category_Name: DataTypes.STRING,
      File_added_by: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      File_Added_Date: DataTypes.DATE,
      File_Updated_By: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      File_Updated_date: DataTypes.DATE,
      File_Size: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      File_Size_Units: DataTypes.STRING,
      Status: DataTypes.SMALLINT,
      File_Event: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      File_Name_Changed: DataTypes.STRING,
      File_Category_Code: DataTypes.STRING,
      File_Type_ext: DataTypes.STRING,
      File_Size_bytes: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      Current_lat: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 0,
      },
      Current_long: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
