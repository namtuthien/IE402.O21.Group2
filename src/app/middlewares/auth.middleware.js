const User = require("../models/user.model");
const jwt = require("jwt-simple");

async function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  try {
    const decodedToken = jwt.decode(token, null, true);
    const { userId, exp } = decodedToken;
  
    if (Date.now() >= exp) {
      return res.status(401).send("Unauthorized: Token expired");
    }

    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie("token");
      return res.status(401).send("Unauthorized: User not found");
    }
    req.user_id = userId;
    return next();
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = checkToken;
