const createHttpError = require("http-errors");

exports.CheckAdminRole = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "ADMIN")
      throw createHttpError.Forbidden(
        "your dont have permissions to access this route"
      );
    next();
  } catch (error) {
    next(error);
  }
};
