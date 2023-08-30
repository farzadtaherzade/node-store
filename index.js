require("dotenv").config();

const Server = require("./app/server");

new Server(8000, process.env.MONGO_ADDRESS);
