import UserDatabase from "./user.mongo.js";

const DEFAULT_ID = 100;

async function getLatestId() {
  const latestId = await UserDatabase.findOne().sort("-id");
  if (!latestId) return DEFAULT_ID;
  return latestId.id;
}

async function ExistingMail(email) {
  const existingUser = await UserDatabase.findOne({ email });
  return existingUser;
}

async function ExistingUsername(name) {
  const existingUser = await UserDatabase.findOne({ username: name });
  return existingUser;
}

//save user with id, email,username,password
async function saveUser(id, email, username, password) {
  const user = new UserDatabase({
    id,
    email,
    username,
    password,
    isAdmin: false,
  });
  return user.save();
}

async function findUserByusernameAndPassword(name, pass) {
  try {
    const user = await UserDatabase.findOne({
      username: name,
      password: pass,
    });
    return user;
  } catch (error) {
    console.error("Error finding user by username and password:", error);
    throw new Error("Database query failed");
  }
}
async function convertingAdmin(username, password) {
  try {
    const user = await UserDatabase.findOne({
      username: username,
      password: password,
    });

    if (!user) {
      throw new Error("User not found");
    }

    user.isAdmin = true;

    await user.save();
  } catch (error) {
    console.error("Error finding user by username and password:", error);
    throw new Error("Database query failed");
  }
}

export {
  getLatestId,
  ExistingMail,
  saveUser,
  ExistingUsername,
  findUserByusernameAndPassword,
  convertingAdmin
};
