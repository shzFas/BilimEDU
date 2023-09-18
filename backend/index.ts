import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
/* Check process.env */
const mongoDB = process.env.MONGODB_URI;
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

app.listen(port, () => {
  console.log(`Server start http://localhost:${port}`);
});