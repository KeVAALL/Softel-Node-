export default (connection, DataTypes) => {
  return connection.define(
    "jobCardAssociatedStandardActions",
    {
      jcId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      standardActionId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      otherStandardActionName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
