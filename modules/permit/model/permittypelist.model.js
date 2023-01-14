export default (connection, DataTypes) => {
  return connection.define("PermitTypeList", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    facilityId: DataTypes.INTEGER,
  });
};
