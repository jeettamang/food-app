import mongoose from "mongoose";
export const conectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Failed to connect database", error.message);
    throw error;
  }
};
