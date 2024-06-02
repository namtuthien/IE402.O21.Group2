// import models
const Rating = require("../models/rating.model");
const User = require("../models/user.model");
class CustomerController {
  async index(req, res, next) {
    // Mốt hoàn thiện rồi thì bỏ cái user_id fix cứng kia
    const user_id = req.user_id || "661fe62db3060de4f1801e2e";
    try {
      const user = await User.findOne({ _id: user_id }).select("-user_password");
      if (user.user_role !== "staff") {
        return res.status(403).json("Unathorized action!");
      } else {
        const listRatings = await Rating.find({});
        res.status(200).json(listRatings);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // [POST] /customer/rating/store
  async storeRating(req, res, next) {
    // Mốt hoàn thiện rồi thì bỏ cái user_id fix cứng kia
    const user_id = req.user_id || "661fe62db3060de4f1801e36";
    const content = req.body;
    if (user_id) {
      try {
        const newRating = new Rating({
          customer: user_id,
          ...content,
        });
        await newRating.save();
        res.status(201).json({ success: "Rate successfully!" });
      } catch (error) {
        res.json(error);
      }
    } else {
      return res.status(500).json({ message: "Không tìm thấy customer" });
    }
  }
}
module.exports = new CustomerController();
