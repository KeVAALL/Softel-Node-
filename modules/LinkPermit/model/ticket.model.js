export default (connection, DataTypes) => {
  return connection.define(
    "tickets",
    {
      ticketId: DataTypes.INTEGER,
      ticketType: DataTypes.INTEGER,
      ticketNumber: DataTypes.INTEGER,
      plantId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      requirement: DataTypes.STRING,
      createDateAndTime: DataTypes.DATE,
      closingDateAndTime: DataTypes.DATE,
      auditClosingDate: DataTypes.DATEONLY,
      ticketCreatedBy: DataTypes.STRING,
      ticketCreatedById: DataTypes.INTEGER,
      ticketAssignedTo: DataTypes.STRING,
      ticketAssignedToId: DataTypes.INTEGER,
      ticketAssignedBy: DataTypes.STRING,
      ticketAssignedById: DataTypes.INTEGER,
      assignedDateAndTime: DataTypes.DATE,
      ticketStatus: DataTypes.INTEGER,
      ticketApproveStatus: DataTypes.INTEGER,
      ticketRejectStatus: DataTypes.INTEGER,
      ticketApprovedById: DataTypes.INTEGER,
      ticketApprovedRecommendations: DataTypes.TEXT,
      ticketApprovedDate: DataTypes.DATE,
      ticketRejectedById: DataTypes.INTEGER,
      ticketRejectedRecommendations: DataTypes.TEXT,
      ticketRejectedDate: DataTypes.DATE,
      priority: DataTypes.STRING,
      dupTicketId: DataTypes.STRING,
      executionId: DataTypes.INTEGER,
      // timeStamp: {
      //   type: TIME,
      // },
    },
    {
      timestamps: false,
    }
  );
};
