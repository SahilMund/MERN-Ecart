const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ErrorHandler } = require("../utils/handleError");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token, req.cookies);
  if (!token) {
    return next(ErrorHandler("", "Login to Continue..", 401, res));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
};
