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

const filteredLocations = locations.map((item) => ({
  location_coordinate: {
    longitude: item.longitude,
    latitude: item.latitude,
  },
  location_name: item.title,
  location_type: item.type,
  location_address: item.address,
  location_description: item.description,
  location_rating: item.rating ?? 0,
  location_total_rating: item.ratingCount ?? 0,
  location_phone_number: item.phoneNumber,
  location_website: item.website,
}));

Location.create(filteredLocations)
  .then((data) => {
    console.log("Thành công. Locations đã được thêm vào cơ sở dữ liệu", data);
  })
  .catch((err) => {
    console.log("Lỗi.", err);
  });
