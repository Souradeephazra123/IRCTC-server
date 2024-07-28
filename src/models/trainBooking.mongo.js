import mongoose from "mongoose";

const TrainBooking = new mongoose.Schema({
  booking_id: {
    type: Number,
    required: true,
  },
  train_id: {
    type: Number,
    required: true,
  },
  train_name: {
    type: String,
  },
  user_id: {
    type: String,
  },
  no_of_seats: {
    type: Number,
  },
  seat_numbers: {
    type: Array,
  },
  arrival_time_at_source: {
    type: String,
  },
  arrival_time_at_destination: {
    type: String,
  },
});

export default mongoose.model("TrainBookings", TrainBooking);
