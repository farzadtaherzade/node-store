const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

exports.HashString = (str) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(str, salt);
};
exports.isSlug = (str) => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(str);
};
exports.SignAccessToken = (id) => {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findOne({ _id: id });
    const payload = {
      email: user.email,
    };
    const option = {
      expiresIn: "1y",
    };
    jwt.sign(
      payload,
      process.env.SECRET_ACCESS_TOKEN,
      option,
      (error, token) => {
        if (error)
          reject(createHttpError.InternalServerError("internal server"));
        resolve(token);
      }
    );
  });
};
