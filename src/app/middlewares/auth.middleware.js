const User = require("../models/user.model");
const jwt = require("jwt-simple");
async function checkToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next(); // Không có token, tiếp tục xử lý tiếp theo
  }
  try {
    const decodedToken = jwt.decode(token, null, true);
    const { userId } = decodedToken;
    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie("token");
      return next();
    }
    switch (user.user_role) {
      case "customer":
        res.render("pages/customer/test.hbs");
      case "staff":
        res.render("pages/staff/test.hbs");
      case "admin":
        res.render("pages/admin/test.hbs");
    }
  } catch (error) {
    console.error(error);
    return res.redirect("/");
  }
}

module.exports = checkToken;
