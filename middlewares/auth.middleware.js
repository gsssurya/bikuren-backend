const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const auth = (req, res, next) => {
  try {

    const token = req.signedCookies.token || req.cookies.token;

    if (!token) {
      return next(new AppError("You are not signed in yet!", 403));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const currentExp = decoded.exp * 1000;
    const now = Date.now();

    const remainingTime = currentExp - now;

    const newMaxAge = remainingTime + 1000 * 60 * 60;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: newMaxAge,
      signed: true,
    });

    next();

  } catch (err) {
    next(new AppError("Invalid or expired token", 401));
  }
};

module.exports = auth;