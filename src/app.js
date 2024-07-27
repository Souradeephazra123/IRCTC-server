import express from "express";
import cors from "cors";
import { AuthRouter } from "./routes/Authorize/Authorize.route.js";
import { TrainRouter } from "./routes/Train/train.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//converting into json
app.use(express.json());

app.use("/api", AuthRouter);
app.use("/api", TrainRouter);

export { app };
