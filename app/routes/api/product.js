const {
  ProductController,
} = require("../../http/controllers/product.controller");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/checkAccessToken");
const { CheckAdminRole } = require("../../http/middlewares/checkRole");
const { upload } = require("../../utils/multer");

const router = require("express").Router();

router.post(
  "/add",
  VerifyAccessToken,
  upload.single("cover"),

  ProductController.addProduct
);
router.get("/list", ProductController.getAllProduct);
router.get("/:slug", ProductController.getOneProduct);

module.exports = {
  ProductRouter: router,
};
