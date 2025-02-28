import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (e) {
    console.error("Database connection error", e);
    process.exit(1);
  }
};

export default  connectDB;
