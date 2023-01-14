export default (connection, DataTypes) => {
  return connection.define(
    "permitLOTOAssets",
    {
      PTW_id: DataTypes.INTEGER,
      Loto_key: DataTypes.STRING,
      Loto_Asset_id: DataTypes.INTEGER,
      lotoRemovedStatus: DataTypes.INTEGER,
      lotoRemovedDate: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
