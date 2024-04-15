// set environment
const dotenv = require("dotenv");
dotenv.config();

// import libs
const fs = require("fs");
const path = require("path");

// import model
const Location = require("../src/app/models/location.model");

// connect to db
const { db } = require("../src/config");
db.connect();

// Đọc tệp JSON
const ecologicalPark = JSON.parse(
  fs.readFileSync(path.join(__dirname, "jsons", "ecological-park.json"), "utf8")
).places;
const touristAttraction = JSON.parse(
  fs.readFileSync(path.join(__dirname, "jsons", "tourist-attraction.json"), "utf8")
).places;
const campingArea = JSON.parse(
  fs.readFileSync(path.join(__dirname, "jsons", "camping-area.json"), "utf8")
).places;
const beautySpot = JSON.parse(
  fs.readFileSync(path.join(__dirname, "jsons", "beauty-spot.json"), "utf8")
).places;
const homeStay = JSON.parse(
  fs.readFileSync(path.join(__dirname, "jsons", "home-stay.json"), "utf8")
).places;

// Tạo mảng các Location
const locations = [
  ...ecologicalPark,
  ...touristAttraction,
  ...campingArea,
  ...beautySpot,
  ...homeStay,
];

const preprocessedLocations = locations.map((item) => ({
  name: item.title,
  address: item.address,
  description: item.description ?? "",
  coordinate: {
    longitude: item.longitude,
    latitude: item.latitude,
  },
  rating: item.rating ?? 0,
  ratingCount: item.ratingCount ?? 0,
  type: item.type,
  phoneNumber: item.phoneNumber ?? "",
  website: item.website ?? "",
}));

Location.create(preprocessedLocations)
  .then((data) => {
    console.log("Thành công. Locations đã được thêm vào cơ sở dữ liệu", data);
  })
  .catch((err) => {
    console.log("Lỗi.", err);
  });
