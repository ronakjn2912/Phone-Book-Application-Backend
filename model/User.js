const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConnection");
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      max: 10,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 5,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = User;
