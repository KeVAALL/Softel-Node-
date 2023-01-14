export default (connection, DataTypes) => {
  return connection.define(
    "PermitLOTOAssets",
    {
      PTW_id: DataTypes.INTEGER,
      Loto_Key: DataTypes.STRING,
      Loto_Asset_id: DataTypes.INTEGER,
      lotoRemovedStatus: DataTypes.INTEGER,
      lotoRemovedDate: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
