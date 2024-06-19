// import models
const Rating = require("../models/rating.model");
const User = require("../models/user.model");
class CustomerController {
  async index(req, res, next) {
    // Mốt hoàn thiện rồi thì bỏ cái user_id fix cứng kia
    const user_id = req.user_id;
    try {
      const user = await User.findOne({ _id: user_id }).select("-user_password");
      if (!(user.user_role === "admin" || user.user_role === "staff")) {
        return res.status(403).json("Unathorized action!");
      } else {
        const listRatings = await Rating.find().populate("customer").populate("tour");
        let newRatings = [];
        listRatings.forEach((tour) => {
          newRatings.push(tour.toObject());
        });
        res.status(200).json({ newRatings });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getTourRating(req, res, next) {
    const user_id = req.user_id;
    const tour_id = req.query.tourId;
    try {
      const user = await User.findOne({ _id: user_id }).select("-user_password");
      if (!(user.user_role === "admin" || user.user_role === "staff")) {
        return res.status(403).json("Unathorized action!");
      } else {
        const listRatings = await Rating.find({ tour: tour_id });
        let newRatings = [];
        listRatings.forEach((tour) => {
          newRatings.push(tour.toObject());
        });
        res.status(200).json({ newRatings });
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
  // [GET] /admin/ratings
  async showRatings(req, res, next) {
    try {
      const ratings = await Rating.find().populate("customer").populate("tour");
      if (!ratings) {
        return res.status(404).json({
          message: "Tour not found!",
        });
      }
      var newTours = [];
      ratings.forEach((tour) => {
        newTours.push(tour.toObject());
      });
      return res.status(200).render("pages/admin/ratings/index", {
        pageTitle: "Danh sách đánh giá",
        style: "/pages/admin/ratings.css",
        script: "/pages/admin/ratings.js",
        ratings: newTours,
        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
module.exports = new CustomerController();
