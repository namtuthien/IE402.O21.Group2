const User = require("../models/user.model");
const jwtDecode = require("jwt-simple");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate secret key
async function generateSecretKey() {
  return crypto.randomBytes(32).toString("hex");
}

// Generate token
async function generateToken(userId, secretKey) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "1h" }); // Add expiration time to the token
}

// Middleware to check token and authorize user
async function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).render("errors/403", {
      pageTitle: "Page Not Found",
      style: "/errors/403/index.css",
      script: "/errors/403/index.js",
      layout: "error",
      message: "You don't have permission. Please login!",
    });
  }

  try {
    const decodedToken = jwtDecode.decode(token, null, true);
    const { userId, exp } = decodedToken;
    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie("token");
      return res.status(401).send("Unauthorized: User not found");
    }
    // Check if token is expired
    if (Date.now() >= exp * 1000) {
      const secretKey = await generateSecretKey();
      const newToken = await generateToken(userId, secretKey);
      res.cookie("token", newToken, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });
    }

    req.user_id = userId;
    req.user_role = user.user_role;

    res.locals.user = {
      user_name: user.user_name,
      user_role: user.user_role
    };

    next();
  } catch (error) {
    return res.status(500).send({ "Internal Server Error": error.message });
  }
}
async function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwtDecode.decode(token, null, true);
      const { userId } = decodedToken;
      const user = await User.findById(userId);

      if (user) {
        switch (user.user_role) {
          case "staff":
            return res.redirect("/staff/tours");
          case "admin":
            return res.redirect("/admin/dashboard");
          case "tourguide":
            return res.redirect("/tourguide/dashboard");
          default:
            return res.redirect("/");
        }
      }
    } catch (error) {
      console.error("Error decoding token or finding user:", error);
      // Handle the error as needed, e.g., redirect to a login page
      return res.redirect("/");
    }
  }
  next();
}

module.exports = {
  checkToken,
  isLoggedIn,
};
