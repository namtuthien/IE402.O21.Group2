const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vehicle = new Schema({
  vehicle_name: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  vehicle_license_plate: { type: String, required: true },
  vehicle_total_seat: { type: Number, required: true },
  vehicle_total_seat_available: { type: Number, required: true },
  //   area: { type: ObjectId },
  is_available: { type: Boolean, required: true },
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Vehicle", Vehicle);
