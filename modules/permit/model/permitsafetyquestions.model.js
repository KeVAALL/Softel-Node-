export default (connection, DataTypes) => {
  return connection.define(
    "PermitSafetyQuestions",
    {
      permitId: DataTypes.INTEGER,
      safetyMeasureValue: DataTypes.STRING,
      safetyMeasureId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
