export default (connection, DataTypes) => {
  return connection.define(
    "employee",
    {
      firstName: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER(2),
      },
      designationId: {
        type: DataTypes.INTEGER(11),
      },
      isEmployee: {
        type: DataTypes.INTEGER(1),
        defaultValue: 0,
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      joiningDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER(11),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER(11),
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 1,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      mobileNumber: {
        type: DataTypes.INTEGER(25),
        allowNull: false,
      },
      emailId: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      empLandLine: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      photo: {
        type: DataTypes.INTEGER(11),
      },
    },
    {
      timestamps: false,
    }
  );
};
