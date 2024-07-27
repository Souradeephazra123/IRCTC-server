import http from "http";
import dotenv from "dotenv";

import { app } from "./app.js";
import { mongoConnect } from "./services/MongoConnect.js";
dotenv.config();



const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect()
  server.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
