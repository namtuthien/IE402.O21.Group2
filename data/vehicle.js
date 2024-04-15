const dotenv = require("dotenv");
const Vehicle = require("../src/app/models/vehicle.model");

dotenv.config();

const { db } = require("../src/config");
db.connect();

const vehicle = [
  {
    name: "Ford Transit",
    type: "Ô tô",
    total_seat: 16,
  },
  {
    name: "Mercedes-Benz Sprinter",
    type: "Ô tô",
    total_seat: 16,
  },
  {
    name: "Toyota Hiace",
    type: "Ô tô",
    total_seat: 15,
  },
  {
    name: "Samco Isuzu Bus",
    type: "Xe buýt",
    total_seat: 29,
  },
  {
    name: "Hyundai County",
    type: "Xe buýt",
    total_seat: 29,
  },
];

const createVehicle = () => {
  let vehicles = [];
  for (let i = 0; i < 25; i++) {
    let idx = i % 5;
    let bsx;
    if (i < 10) {
      bsx = `${0 + i}`;
    } else {
      bsx = `${i}`;
    }
    vehicles.push({
      name: vehicle[idx].name,
      type: vehicle[idx].type,
      license_plates: "51G-102" + bsx,
      is_available: true,
      total_seat: vehicle[idx].total_seat,
      total_seat_available: vehicle[idx].total_seat,
      area: null,
    });
  }
  return vehicles;
};

const vehicles = createVehicle();

Vehicle.create(vehicles)
  .then((data) => {
    console.log("Thành công. Users đã được thêm vào cơ sở dữ liệu", data);
  })
  .catch((err) => {
    console.log("Lỗi.", err);
  });
