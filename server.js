import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.use("/api/v1/todo", todoRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
