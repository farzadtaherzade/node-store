const { AuthController } = require("../../http/controllers/auth.controllers");

const router = require("express").Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = {
  AuthRouter: router,
};
