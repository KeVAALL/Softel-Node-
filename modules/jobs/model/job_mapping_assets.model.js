export default (connection, DataTypes) => {
  return connection.define(
    "JobMappingAssets",
    {
      jobId: DataTypes.INTEGER,
      assetId: DataTypes.INTEGER,
      assetCategoryId: DataTypes.INTEGER,
    },
    {
      // createdAt: false,
      // updatedAt: false,
      timestamps: false,
    }
  );
};
