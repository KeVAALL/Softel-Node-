export default (connection, DataTypes) => {
  return connection.define("PermitAssetLists", {
    ptwId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
  });
};
