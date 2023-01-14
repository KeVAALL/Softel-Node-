export default (connection, DataTypes) => {
  return connection.define("PermitTypeSafetyMeasures", {
    permitTypeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    discription: DataTypes.STRING,
    input: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.INTEGER,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.INTEGER,
    required: DataTypes.INTEGER,
  });
};
