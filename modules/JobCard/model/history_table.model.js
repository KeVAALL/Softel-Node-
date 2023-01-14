export default (connection, DataTypes) => {
  return connection.define(
    "historyTables",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      moduleType: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      moduleRefId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      moduleRefIdSecondary: {
        type: DataTypes.INTEGER(11),
      },
      comment: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      postedBy: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      approvalStatus: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      closeCarryForwardStatus: {
        type: DataTypes.INTEGER(11),
      },
      addedTimeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      deletedBy: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0,
      },
      deleteTimeStamp: {
        type: DataTypes.STRING(50),
      },
      currentLat: {
        type: DataTypes.STRING(255),
        // allowNull: false,
      },
      currentLong: {
        type: DataTypes.STRING(255),
        // allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
