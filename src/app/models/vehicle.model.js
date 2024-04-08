const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Vehicle = new Schema({
  _id: { type: ObjectId },
  name: { type: String },
  type: { type: String },
  license_plates: { type: String },
  is_available: { type: Boolean },
  total_seat: { type: Number },
  total_seat_available: { type: Number },
  area: { type: ObjectId },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Vehicle", Vehicle);
