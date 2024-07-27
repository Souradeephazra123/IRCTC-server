import TrainBookingDatabase from "./trainBooking.mongo.js";

const DEFAULT_BOOKING_ID = 6000000;

async function getLatestTrainBookingId() {
  const latestBooking = await TrainBookingDatabase.findOne().sort(
    "-booking_id"
  );
  if (!latestBooking) {
    return DEFAULT_BOOKING_ID;
  }
  return latestBooking.booking_id;
}

async function bookTrain(train, user_id, no_of_seats) {
  const { train_id, arrival_time_at_source, arrival_time_at_destination } =
    train;

  let lastBookedSeat = train.lastBookedSeat || 0;

  //generate seat numbers array

  const seat_numbers = [];
  for (let i = 1; i <= no_of_seats; i++) {
    lastBookedSeat++;
    seat_numbers.push(lastBookedSeat);
  }

  const booking = new TrainBookingDatabase({
    booking_id: (await getLatestTrainBookingId()) + 1,
    train_id,
    user_id,
    no_of_seats,
    seat_numbers,
    arrival_time_at_source,
    arrival_time_at_destination,
  });

  try {
    train.lastBookedSeat = lastBookedSeat;
    await train.save();
    const savedBooking = await booking.save();
    return savedBooking;
  } catch (err) {
    console.log(`Unable to save the booking, here is the error :- ${err}`);
  }
}

async function findBookingById(id) {
  try {
    const bookingDetails = await TrainBookingDatabase.findOne(
      {
        booking_id: id,
      },
      { _id: 0, __v: 0 }
    );
    return bookingDetails;
  } catch (error) {
    console.log(`Unable to find booking by this id :- ${error}`);
  }
}

export { bookTrain, findBookingById };
