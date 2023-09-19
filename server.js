import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Routers
import employeeRouter from "./routes/employeeRouter.js";
import vacationRouter from "./routes/vacationRouter.js";
import cancelledRouter from "./routes/cancelledRouter.js";
import authRouter from "./routes/authRouter.js";
// Public
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// Middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.json());
app.use(cookieParser());

// app.use("/api/v1/employees", authenticateUser, employeeRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/vacations", vacationRouter);
app.use("/api/v1/cancelled", cancelledRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Route not found." });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

if (!process.env.MONGO_URL) {
  console.log("MongoDB URL is not valid.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on PORT ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
