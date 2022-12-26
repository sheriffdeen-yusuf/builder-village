import { Sequelize } from "sequelize";
import dbConfig from "../config/dbConfig.js";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  dbConfig.dbName,
  dbConfig.dbUser,
  dbConfig.dbPass,
  {
    host: dbConfig.dbHost,
    dialect: "mysql",
    define: {
      freezeTableName: false,
      timestamps: false,
    },
  }
);

sequelize
  .authenticate()
  .then((data) => console.log("SUCESS! Connecting to the database"))
  .catch((err) => console.log("ERROR! While connecting to the databse"));
