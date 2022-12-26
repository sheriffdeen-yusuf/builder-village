import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
  dbName: process.env.DATABASE_NAME,
  dbHost: process.env.DATABASE_HOST,
  dbUser: process.env.DATABASE_USER,
  dbPass: process.env.DATABASE_PASSWORD,
};

export default dbConfig;
