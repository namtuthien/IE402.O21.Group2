// import models
const Tour = require("../models/tour.model");

class TourController {
  // [GET] /tour/create
  create(req, res, next) {}

  // [GET] /tour/addTour
  showAddTourForm(req, res, next) {
    res.render("./components/add-tour/index", {
      pageTitle: "",
      style: "/components/add-tour/add-tour.module.css",
      script: "/components/add-tour/add-tour.js",
    });
  }

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

  // [PATCH] /tour/update/:id
  async update(req, res, next) {
    try {
      const tourId = req.params.id;
      const updatedTourData = req.body;
      await Tour.findByIdAndUpdate(tourId, updatedTourData);
      res.status(200).send("Cập nhật tour thành công");
    } catch (error) {
      res.status(500).send("Cập nhật tour thất bại");
    }
  }

  // [PATCH] /tour/delete/:id
  async delete(req, res, next) {
    try {
      const tourId = req.params.id;
      await Tour.findByIdAndUpdate(tourId, { is_active: false });
      res.status(200).send("Tour đã được đánh dấu không hoạt động");
    } catch (error) {
      res.status(500).send("Đánh dấu tour không hoạt động thất bại");
    }
  }
}

module.exports = new TourController();
