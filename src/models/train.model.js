import TrainDatabase from "./train.mongo.js";

const DEGAULT_TRAIN_NUMBER = 100000;

async function getLatestTrainId() {
  const latestTrain = await TrainDatabase.findOne().sort("-train_id");
  if (!latestTrain) {
    return DEGAULT_TRAIN_NUMBER;
  }
  return latestTrain.train_id;
}

async function saveTrain(
  train_name,
  source,
  destination,
  seat_capacity,
  arrival_time_at_source,
  arrival_time_at_destination
) {
  let totalSeat = seat_capacity;
  const train = new TrainDatabase({
    train_id: (await getLatestTrainId()) + 1,
    train_name,
    source,
    destination,
    seat_capacity,
    arrival_time_at_source,
    arrival_time_at_destination,
    available_seats: totalSeat,
  });

  try {
    const savedTrain = await train.save();
    return savedTrain;
  } catch (err) {
    console.log(`Unable to save the train, here is the error :- ${err}`);
  }
}

async function findTrains(src, dest) {
  const trains = await TrainDatabase.find({
    source: src,
    destination: dest,
  });
  //returning only specific property
  return trains.map((train) => ({
    train_id: train.train_id,
    train_name: train.train_name,
    available_seats: train.available_seats,
  }));
}

async function findTrainById(id) {
  try {
    const train = await TrainDatabase.findOne({
      train_id: id,
    });
    return train;
  } catch (error) {
    throw new Error("Unable to find train with this id");
  }
}

export { saveTrain, getLatestTrainId, findTrains, findTrainById };
