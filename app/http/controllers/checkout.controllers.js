const createHttpError = require("http-errors");
const { CheckoutModel } = require("../../models/checkout");
const Controller = require("./controller");

class CheckoutController extends Controller {
  async addCheckout(req, res, next) {
    try {
      const { cartItems, totalAmount } = req.body;
      const id = req.user._id;
      const createResult = await CheckoutModel.create({
        cartItems,
        totalAmount,
        user_detail: id,
      });
      if (!createResult)
        throw createHttpError.InternalServerError("خطای داخلی");
      return res.status(201).json({
        statusCode: 201,
        message: "checkout created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllCheckout(req, res, next) {
    try {
      const checkouts = await CheckoutModel.find({ user_detail: req.user._id });
      return res.status(200).json({
        statusCode: 200,
        checkouts,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  CheckoutController: new CheckoutController(),
};
