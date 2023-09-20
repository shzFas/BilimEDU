import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  handleValidationErrors,
  loginValidation,
  registerValidation,
} from "./validation";
import { UserController } from "./controllers";
dotenv.config();
/* Check process.env */
const mongoDB = process.env.MONGODB_URI;
export const secretKey = process.env.SECRET_KEY;
if (!mongoDB) {
  console.error("URI string MongoDB is null");
  process.exit(1);
}
/* DB */
mongoose
  .connect(mongoDB)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app: Express = express();
const port = 4444; /* PORT */

app.use(express.json());
app.use(cors());
/* Users */
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.listen(port, () => {
  console.log(`Server start http://localhost:${port}`);
});
