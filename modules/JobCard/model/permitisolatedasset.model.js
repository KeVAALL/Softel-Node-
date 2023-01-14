export default (connection, DataTypes) => {
  return connection.define("permitIsolatedAssets", {
    permitId: DataTypes.INTEGER,
    assetCategoryId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    normalisedStatus: DataTypes.INTEGER,
    normalisedDate: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
