const {
  CheckoutController,
} = require("../../http/controllers/checkout.controllers");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/checkAccessToken");

const router = require("express").Router();

router.post("/add", VerifyAccessToken, CheckoutController.addCheckout);
router.get("/list", VerifyAccessToken, CheckoutController.getAllCheckout);

module.exports = {
  CheckoutRouter: router,
};
