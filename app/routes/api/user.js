const { UserController } = require("../../http/controllers/user.controllers");
const {
  VerifyAccessToken,
} = require("../../http/middlewares/checkAccessToken");

const router = require("express").Router();

router.get("/me", VerifyAccessToken, UserController.getUser);
router.patch("/update", VerifyAccessToken, UserController.updateUser);

module.exports = {
  UserRouter: router,
};
