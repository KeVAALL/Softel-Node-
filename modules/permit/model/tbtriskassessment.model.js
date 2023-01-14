// import { dateIsValid } from "../../../utility/common";

export default (connection, DataTypes) => {
  return connection.define(
    "tbtriskassessments",
    {
      tbtId: DataTypes.INTEGER,
      tbtCode: DataTypes.STRING,

      status: DataTypes.STRING,
      ptwCode: DataTypes.STRING,
      ptwId: DataTypes.INTEGER,
      riskId: DataTypes.INTEGER,
      riskCode: DataTypes.STRING,
      riskName: DataTypes.STRING,
      riskDescription: DataTypes.TEXT,
      riskMitigationPlan: DataTypes.TEXT,
      riskAddedDate: DataTypes.DATE,
      riskAddedBy: DataTypes.INTEGER,
      riskUpdateDate: DataTypes.DATE,
      riskUpdateBy: DataTypes.INTEGER,
    },

    {
      timestamps: false,
    }
  );
};
