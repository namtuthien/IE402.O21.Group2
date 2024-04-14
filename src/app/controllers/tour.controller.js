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
}

module.exports = new TourController();
