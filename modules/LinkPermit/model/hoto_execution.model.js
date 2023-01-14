export default (connection, DataTypes) => {
  return connection.define(
    "hotoexecutions",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      scheduleId: DataTypes.INTEGER,
      checklistType: DataTypes.INTEGER,
      checkPointId: DataTypes.INTEGER,
      checkPointName: DataTypes.TEXT,
      checkPointCode: DataTypes.TEXT,
      checkPointRemark: DataTypes.TEXT,
      ticketCreated: DataTypes.INTEGER,
      criteriaId: DataTypes.INTEGER,
      customCheckpoint: DataTypes.INTEGER,
      evidenceRequired: DataTypes.INTEGER,
      scheduleAddedBy: DataTypes.INTEGER,
      scheduleAddDate: DataTypes.DATE,
      scheduleUpdateBy: DataTypes.INTEGER,
      scheduleUpdateDate: DataTypes.DATE,
      status: DataTypes.INTEGER,
      checkPointRequirement: DataTypes.STRING,
      documentName: DataTypes.STRING,
      location: DataTypes.STRING,
      docType: DataTypes.INTEGER,
      documentType: DataTypes.STRING,
      isDocumentApproved: DataTypes.INTEGER,
      documentApprovedRemark: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
};
