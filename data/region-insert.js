// set environment
const dotenv = require("dotenv");
dotenv.config();

// import libs
const fs = require("fs");
const path = require("path");

// import model
const Region = require("../src/app/models/region.model");
const Polygon = require("../src/app/models/polygon.model");

// connect to db
const { db } = require("../src/config");
db.connect();

// Đọc tệp JSON
let regions = JSON.parse(fs.readFileSync(path.join(__dirname, "jsons", "region.json"), "utf8"));

const handleRegions = async (regions) => {
  const returnedRegions = await Promise.all(
    regions.map(async (region) => {
      const polygons = region.polygons;

      const insertedPolygon = await Polygon.create(polygons);
      const polygonIds = insertedPolygon.map((polygon) => polygon._id);

      return {
        region_name: region.region_name,
        region_description: region.region_description,
        polygons: polygonIds,
      };
    })
  );

  return returnedRegions;
};

const main = async () => {
  try {
    regions = await handleRegions(regions);

    const createdRegions = await Region.create(regions);
    console.log("Thành công. Regions đã được thêm vào cơ sở dữ liệu", createdRegions);
  } catch (err) {
    console.error("Lỗi.", err);
  }
};

main();
