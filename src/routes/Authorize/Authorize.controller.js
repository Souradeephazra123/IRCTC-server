import crypto from "crypto";
import jwt from "jsonwebtoken";
import {
  ExistingMail,
  ExistingUsername,
  getLatestId,
  saveUser,
  findUserByusernameAndPassword,
  convertingAdmin,
} from "../../models/user.model.js";

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    //checking if all are provided or not

    if (!username || !email || !password) {
      return res.status(401).json({
        msg: "Please provide all required details",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        msg: "Invalid email address",
      });
    }

    //find if user with this email already exits
    const existing_email = await ExistingMail(email);
    if (existing_email) {
      return res.status(400).json({
        msg: "User with this email address is already exist! please enter different email",
      });
    }
    //find if user with this username already exits
    const existing_username = await ExistingUsername(username);
    if (existing_username) {
      return res.status(400).json({
        msg: "User with this username is already exist! please enter different username",
      });
    }

    //checking password length
    if (password.length < 6) {
      return res.status(400).json({
        msg: "Please enter password more than length of 6",
      });
    }
    //latest id getting from db
    const id = (await getLatestId()) + 1;

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    await saveUser(id, email, username, hashedPassword);

    res.status(201).json({
      status: "Account successfully created",
      status_code: 201,
      user_id: id,
    });
  } catch (error) {
    // If an error occurs, ensure no response was sent before
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

async function signin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(401).json({
        msg: "Please provide all required details",
      });
    }

    // decrypting the password and match with the specied user password
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    //find the user by email and hashed password
    const user = await findUserByusernameAndPassword(username, hashedPassword);

    //if not found show error
    if (!user) {
      return res.status(401).json({
        msg: "Incorrect email or password provided, please retry",
      });
    }

    //if user email and password match then create token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      status: "Login successful",
      status_code: 200,
      user_id: user.id,
      access_token: token,
    });
  } catch (error) {
    // If an error occurs, ensure no response was sent before
    res.status(500).json({
      msg: "Internal server error",
    });
  }
}

async function convertToAdmin(req, res) {
  const { username, password, token } = req.body;

  if (!username || !token || !password) {
    return res.status(401).json({
      msg: "Please provide all required details",
    });
  }

  // Check if the provided token matches the secure token
  if (token !== process.env.ADMIN_CREATION_TOKEN) {
    return res
      .status(401)
      .json({ msg: "Unauthorized access to create admin user" });
  }

  // decrypting the password and match with the specied user password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  //find the user by email and hashed password
  const user = await findUserByusernameAndPassword(username, hashedPassword);

  //if not found show error
  if (!user) {
    return res.status(401).json({
      msg: "Incorrect email or password provided, please retry",
    });
  }

  await convertingAdmin(username, hashedPassword);
  res.status(200).json({
    msg: "Sucessfully upgraded to admin,please never store the token",
  });
}

export { signup, signin, convertToAdmin };
