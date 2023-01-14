export default (connection, DataTypes) => {
  return connection.define(
    "PermitBlocks",
    {
      ptw_id: DataTypes.INTEGER,
      block_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
};
