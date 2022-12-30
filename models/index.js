import { DataTypes, Sequelize } from "sequelize";
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

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

import vendorModel from "./vendors.js";
import ClientModel from "./clients.js";
import userLoginModel from "./userLogin.js";

db.vendors = vendorModel(sequelize, DataTypes);
db.clients = ClientModel(sequelize, DataTypes);
db.usersLogin = userLoginModel(sequelize, DataTypes);

db.sequelize
  .sync({ alter: true })
  .then((data) =>
    console.log("Synced Models to Tables in Database Successfully")
  )
  .catch((err) =>
    console.log(err, "ERROR! While trying to Synced to Database")
  );

export default db;
