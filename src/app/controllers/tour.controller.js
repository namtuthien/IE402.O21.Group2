// import models
const Tour = require("../models/tour.model");
const Route = require("../models/route.model");
const Rating = require("../models/rating.model");

const Line = require("../models/line.model");
const { getRouteById } = require("./route.controller");

class TourController {
  // [GET] /tour/create
  create(req, res, next) {}

  // [GET] /tour/add
  showAddTourForm(req, res, next) {
    res.render("./components/add-tour/index", {
      pageTitle: "Thêm Tour",
      style: "/components/add-tour/add-tour.module.css",
      script: "/components/add-tour/add-tour.js",
      layout: "main",
    });
  }

  // [GET] /tour/editTour
  showTourDetailForm(req, res, next) {
    res.render("./components/view-tour/index", {
      pageTitle: "Xem chi tiết Tour",
      style: "/components/add-tour/add-tour.module.css",
      script: "/components/add-tour/add-tour.js",
      layout: "main",
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

  // [PATCH] /admin/tour/edit/:id
  async update(req, res, next) {
    try {
      const tourId = req.params.id;
      const updatedTourData = req.body;
      await Tour.findByIdAndUpdate(tourId, updatedTourData);
      res.status(200).json("Cập nhật tour thành công");
    } catch (error) {
      res.status(500).json("Cập nhật tour thất bại");
    }
  }

  // [DELETE] /admin/tour/delete/:id
  async delete(req, res, next) {
    try {
      const tourId = req.params.id;
      await Tour.deleteOne({ _id: tourId });
      res.status(200).json({ message: "Tour đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Xóa tour thất bại" });
    }
  }

  // [DELETE] /admin/tour/destroy
  async destroy(req, res, next) {
    try {
      const tourIds = req.body;
      await Promise.all(
        tourIds.map(async (tour) => {
          return await Tour.deleteOne({ _id: tour.id });
        })
      );
      res.status(200).json({ message: "Tour đã được xóa thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Xóa tour thất bại" });
    }
  }

  // [GET] /admin/tours
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
      return res.status(200).render("pages/admin/tours/index", {
        pageTitle: "Danh sách tour",
        style: "/pages/admin/tours.css",
        script: "/pages/admin/tours.js",
        tours: newTours,
        mapLink: "/admin/map/tours",
        layout: "main",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
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
  // [GET] /map/tours
  async showToursMap(req, res, next) {
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
      return res.status(200).render("pages/admin/map/tours", {
        pageTitle: "Danh sách tour",
        style: "/pages/admin/tours-map.css",
        script: "/pages/admin/tours-map.js",
        tours: newTours,
        layout: "map",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
  //[GET] /api/tour/getTours
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
  //[GET] /api/tour/getLinesOfTour
  async getLinesOfTour(req, res, next) {
    try {
      //get routes of tour
      var tourRoutes = req.params.routes;
      tourRoutes = JSON.parse(tourRoutes);
      var routes = [];
      var lines = [];
      var points = [];
      for (var i = 0; i < tourRoutes.length; i++) {
        var route = await Route.findOne({ _id: tourRoutes[i].route });
        routes.push(route);
      }
      //get lines of route
      routes.forEach((route) => {});
      for (var i = 0; i < routes.length; i++) {
        for (var j = 0; j < routes[i].lines.length; j++) {
          var line = await Line.findOne({ _id: routes[i].lines[j] });
          lines.push(line);
        }
      }
      lines.forEach((line) => {
        line.points.forEach((point) => {
          points.push([point.longtitude, point.latitude]);
        });
      });
      return res.status(200).json({ points });
    } catch (err) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = new TourController();
