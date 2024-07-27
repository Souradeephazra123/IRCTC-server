import mongoose from "mongoose";

const TrainModel = new mongoose.Schema({
  train_id: {
    type: Number,
    required: true,
    unique: true,
  },
  train_name: {
    type: String,
    required: true,
    unique: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  seat_capacity: {
    type: Number,
    required: true,
  },
  arrival_time_at_source: {
    type: String,
    required: true,
  },
  arrival_time_at_destination: {
    type: String,
    required: true,
  },
  available_seats: {
    type: Number,
  },
  lastBookedSeat: {
    type: Number,
  },
});

export default mongoose.model("train", TrainModel);
