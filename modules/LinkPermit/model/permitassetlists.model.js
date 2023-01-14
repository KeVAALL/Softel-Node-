export default (connection, DataTypes) => {
  return connection.define("permitassetlists", {
    ptwId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
  });
};
