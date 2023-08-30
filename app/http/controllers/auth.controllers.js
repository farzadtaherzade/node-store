const createHttpError = require("http-errors");
const { UserModel } = require("../../models/user");
const Controller = require("./controller");
const { HashString, SignAccessToken } = require("../../utils/functions");
const { compareSync } = require("bcrypt");

class AuthController extends Controller {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user)
        throw createHttpError.Unauthorized("email or password us incorrect");
      const compareResult = compareSync(password, user.password);
      if (!compareResult)
        throw createHttpError.Unauthorized('"email or password us incorrect"');
      const token = await SignAccessToken(user._id);
      return res.status(200).json({
        statusCode: 200,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      const { first_name, last_name, username, email, password } = req.body;
      const hashPassword = HashString(password);
      const user = await UserModel.create({
        first_name,
        last_name,
        email,
        username,
        password: hashPassword,
      });
      if (!user) throw createHttpError.InternalServerError("internal erorr");
      return res.status(201).json({
        statusCode: 201,
        message: "account created!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
