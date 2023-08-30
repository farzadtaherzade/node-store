const { IndexRouter } = require("./api");
const { CheckoutRouter } = require("./api/checkout");
const { ProductRouter } = require("./api/product");
const { UserRouter } = require("./api/user");
const { AuthRouter } = require("./user/auth");

const router = require("express").Router();

router.use("/", IndexRouter);
router.use("/auth", AuthRouter);
router.use("/product", ProductRouter);
router.use("/user", UserRouter);
router.use("/checkout", CheckoutRouter);

module.exports = {
  AllRoutes: router,
};
