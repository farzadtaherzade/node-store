require("dotenv").config();

const Server = require("./app/server");

new Server(8000, "mongodb://127.0.0.1:27017/vueStore");
