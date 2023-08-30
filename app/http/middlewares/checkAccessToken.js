const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../models/user");

const getToken = (headers) => {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (["bearer", "Bearer"].includes(bearer) && token) return token;
  throw createHttpError.Unauthorized("please login to your account token");
};

exports.VerifyAccessToken = (req, res, next) => {
  try {
    const token = getToken(req.headers);
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async (err, payload) => {
      try {
        if (err)
          throw next(
            createHttpError.Unauthorized("please login to your account")
          );
        const { email } = payload;
        const user = await UserModel.findOne({ email });
        if (!user) throw next(createHttpError.Unauthorized("user not found"));
        req.user = user;
        next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
};
