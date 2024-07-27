import express from "express";
import { BookTrain, Createtrain, getBookedTrainDetails, getTrains } from "./train.controller.js";
import { authenticate } from "../auth.middleware.js";

const TrainRouter = express.Router();

TrainRouter.post("/trains/create", Createtrain);
TrainRouter.get("/trains/availability", getTrains);
TrainRouter.post(`/trains/:train_id/book`, authenticate, BookTrain);
TrainRouter.get(`/trains/bookings/:booking_id`, authenticate, getBookedTrainDetails);

export { TrainRouter };
