import {
  findTrainById,
  findTrains,
  getLatestTrainId,
  saveTrain,
} from "../../models/train.model.js";
import { bookTrain, findBookingById } from "../../models/trainBooking.model.js";

async function Createtrain(req, res) {
  const {
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
  } = req.body;

  if (
    !train_name ||
    !source ||
    !destination ||
    !seat_capacity ||
    !arrival_time_at_source ||
    !arrival_time_at_destination
  ) {
    return res.status(401).json({
      msg: "Please fill all the required fields",
    });
  }

  await saveTrain(
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination
  );

  return res.status(201).json({
    msg: "Train added successfully",
    train_id: await getLatestTrainId(),
  });
}

async function getTrains(req, res) {
  const source = req.query.source;
  const destination = req.query.destination;

  // Validate that source and destination are provided
  if (!source || !destination) {
    return res
      .status(400)
      .json({ msg: "Source and destination are required." });
  }

  const availableTrain = await findTrains(source, destination);
  return res.status(200).json(availableTrain);
}

async function BookTrain(req, res) {
  const { user_id, no_of_seats } = req.body;
  const trainId = req.params.train_id;

  if (!user_id || !no_of_seats) {
    return res.status(400).json({ msg: "Please fill all the required fields" });
  }

  if (!trainId) {
    return res.status(400).json({ msg: "Please provide train id" });
  }

  const train = await findTrainById(trainId);
  if (!train) {
    return res.status(400).json({ msg: "Train not found" });
  }

  const BookedDetails = await bookTrain(train, user_id, no_of_seats);

  return res.status(200).json({
    message: "Seat booked successfully",
    booking_id: BookedDetails.booking_id,
    seat_numbers: BookedDetails.seat_numbers,
  });
}

async function getBookedTrainDetails(req, res) {
  const booking_id = req.params.booking_id;

  if (!booking_id) {
    return res.status(400).json({ msg: "Please provide booking id" });
  }

  const bookings = await findBookingById(booking_id);

  if (!bookings) {
    return res.status(404).json({
      msg: "Unable to find booked train with this booking_id",
    });
  }

  return res.status(200).json(bookings);
}

export { Createtrain, getTrains, BookTrain, getBookedTrainDetails };
