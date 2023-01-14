export default (connection, DataTypes) => {
  return connection.define(
    "worktypeassociatedtojob",
    {
      jobId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      workTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      otherWorkTypeName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
