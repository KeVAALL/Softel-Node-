export default (connection, DataTypes) => {
  return connection.define("AssetCategory", {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,
    calibrationStatus: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
