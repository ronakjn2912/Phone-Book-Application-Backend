const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT, //database type
    timezone: "+05:30",//IST
    port: process.env.SQL_PORT, //mysql default port
  }
);
const connectDB = async () => {
  try {
    await sequelize.authenticate(); //to check whether database credentials are correct for connection
    console.log("Connection authenticated");
    return sequelize;
  } catch (err) {
    console.log(err);
    process.exit(1); //cleanly stops the program, with 1 means terminated with error
  }
};

module.exports = { sequelize, connectDB };

// authenticate() - uses promise object , if fulfilled then continues execution or else catch handles error
