import express from "express";
import { convertToAdmin, signin, signup } from "./Authorize.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);

AuthRouter.post("/login", signin);

AuthRouter.post("/admin", convertToAdmin);

export { AuthRouter };
