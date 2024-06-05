const mongoose = require("mongoose");

// set environment
const dotenv = require("dotenv");
dotenv.config();

// import libs
const fs = require("fs");
const path = require("path");

// import model
const Location = require("../src/app/models/location.model");
const Polygon = require("../src/app/models/polygon.model");

// connect to db
const { db } = require("../src/config");
db.connect();

let locations = JSON.parse(
  fs.readFileSync(path.join(__dirname, "jsons", "location-update.json"), "utf8")
);

const handleLocations = async (locations) => {
  for (const location of locations) {
    const insertedPolygon = await Polygon.create({ points: location.points });

    const finded = await Location.findById({ _id: location.location_id });
    finded.boundary = insertedPolygon._id;
    finded.region = location.region;

    finded.save();
    console.log("finded,", finded);
  }
};

handleLocations(locations);
