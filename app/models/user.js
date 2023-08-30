const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER",
  },
  profile_image: { type: String, default: "" },
});

module.exports = {
  UserModel: mongoose.model("user", UserSchema),
};
