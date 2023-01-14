export default (connection, DataTypes) => {
  return connection.define("WorkTypeAssociatedTool", {
    workTypeId: DataTypes.INTEGER,
    ToolId: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
  });
};
