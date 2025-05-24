import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const DBURI = process.env.DBURI;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DBURI);
    console.log(
      `Database connected ${conn.connection.host} - ${conn.connection.db.databaseName}`
    );
  } catch (error) {
    console.log(`DB Connection Error ${error}`);
    process.exit(1);
  }
};
