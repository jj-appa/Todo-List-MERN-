import express from "express";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/todos", todoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port" + PORT);
  console.log("http://localhost:5000");
});
