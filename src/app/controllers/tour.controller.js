// import models
const Tour = require("../models/tour.model");

class TourController {
  // [GET] /tour/create
  create(req, res, next) {}
  // [POST] /tour/store
  async store(req, res, next) {
    const newTour = new Tour(req.body);
    await newTour
      .save()
      .then(() => {
        res.status(201).send("Thêm tour thành công");
      })
      .catch((error) => {
        res.status(500).send("Thêm tour thất bại");
      });
  }
  // [GET] /tour/get-tours
  async showTours(req, res, next) {
    try {
      const tours = await Tour.find();
      if (!tours) {
        return res.status(404).json({
          message: "Tour not found!",
        });
      }
      var newTours = [];
      tours.forEach((tour) => {
        newTours.push(tour.toObject());
      });
      return res.status(200).render("pages/admin/tours", {
        pageTitle: "Danh sách tour",
        style: "/pages/admin/tours.css",
        script: "/pages/admin/tours.js",
        tours: newTours,
        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  async getTours(req, res, next) {
    try {
      const tours = await Tour.find();
      if (!tours) {
        return res.status(404).json({
          message: "Tour not found!",
        });
      }
      var newTours = [];
      tours.forEach((tour) => {
        newTours.push(tour.toObject());
      });
      return res.status(200).json({ newTours });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new TourController();
