import mongoose from "mongoose";

export const dbConn = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connection stable");
  } catch (error) {
    console.log("Database connection failed!");
  }
};
