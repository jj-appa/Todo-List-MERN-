import mongoose from "mongoose";
import dotenv from "dotenv";
// use mongoose to connect to MongoDB

dotenv.config();

// Connect to MongoDB
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully: ${conn.connection.host}");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
