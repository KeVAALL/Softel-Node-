export default (connection, DataTypes) => {
  return connection.define(
    "standardActions",
    {
      jobTypeId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      standardAction: {
        type: DataTypes.STRING(999),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1,
      },
      addedByUserId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
      },
      addedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedByUserId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
