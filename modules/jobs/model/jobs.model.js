export default (connection, DataTypes) => {
  return connection.define("Jobs", {
    facilityId: DataTypes.INTEGER,
    blockId: DataTypes.INTEGER,
    assignedId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    linkedPermit: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    breakdownTime: DataTypes.DATE,
    belongsTo: DataTypes.INTEGER,
    cancellationRemarks: DataTypes.STRING,
    cancelStatus: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
