const homeControllers = require("../../http/controllers/home.controllers");
const router = require("express").Router();

router.get("/", homeControllers.indexPage);

module.exports = {
  IndexRouter: router,
};
