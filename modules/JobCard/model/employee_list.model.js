export default (connection, DataTypes) => {
  return connection.define(
    "employeelists",
    {
      ptwId: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      jcId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      ptwEmployeeId: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      ptwEmployeeName: DataTypes.STRING(255),
      ptwEmployeeCode: DataTypes.STRING(128),
      ptwEmployeeAddDate: DataTypes.DATE,
      ptwEmployeeUpdateDate: DataTypes.DATE,
      ptwEmployeeStatus: {
        type: DataTypes.INTEGER(1),
        defaultValue: 0,
      },
      ptwEmployeePlantId: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      ptwEmployeePlantName: DataTypes.STRING(255),
      ptwEmployeePlantCode: DataTypes.STRING(128),
      ptwEmployeeAddedBy: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      ptwEmployeeUpdateBy: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      ptwStatus: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
      },
      ptwEmployeeResponsibility: DataTypes.STRING(255),
      ptwEmployeeIsCustom: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
