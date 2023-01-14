import { DataTypes } from "sequelize";
import connection from "../../../utility/connection.js";

const usersFacilityDetails = connection.define("Users", {
  userId: DataTypes.INTEGER,
  status: DataTypes.INTEGER,
  facilityId: DataTypes.INTEGER,
  createdAt: DataTypes.DATE,
  createdBy: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  updatedBy: DataTypes.INTEGER,
});

export default usersFacilityDetails;
