import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./config/connectToDb.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

connectToDb();

app.use(express.json());

app.use(cors());
app.use(cookieParser());
app.use("/user", userRoute);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
