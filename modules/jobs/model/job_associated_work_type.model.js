export default (connection, DataTypes) => {
  return connection.define(
    "JobAssociatedWorkType",
    {
      jobId: DataTypes.INTEGER,
      workTypeId: DataTypes.INTEGER,
      otherWorkTypeName: DataTypes.INTEGER,
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
