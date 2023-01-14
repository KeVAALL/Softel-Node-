export default (connection, DataTypes) => {
  return connection.define("PermitEmployeeLists", {
    pwtId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    responsibility: DataTypes.INTEGER,
    isCustomEmployee: DataTypes.INTEGER,
  });
};
