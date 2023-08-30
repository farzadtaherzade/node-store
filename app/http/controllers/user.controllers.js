const createHttpError = require("http-errors");
const { UserModel } = require("../../models/user");
const Controller = require("./controller");

class UserController extends Controller {
  async getUser(req, res, next) {
    try {
      const user = req.user;
      return res.status(200).json({
        statusCode: 200,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const data = { ...req.body };
      const id = req.user._id;
      const badField = [" ", null, undefined, "", 0, "0", NaN];
      const field = ["username", "first_name", "last_name"];
      Object.keys(data).forEach((key) => {
        if (badField.includes(key)) delete data[key];
        if (!field.includes(key)) delete data[key];
      });
      console.log(data);
      const updateResult = await UserModel.updateOne(
        { _id: id },
        { $set: data }
      );
      if (updateResult.modifiedCount == 0)
        throw createHttpError.InternalServerError("Error");
      return res.status(200).json({
        statusCode: 200,
        message: "use updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
