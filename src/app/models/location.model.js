const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema({
  location_name: { type: String, required: true },
  location_address: { type: String, required: true },
  location_description: { type: String },
  location_coordinate: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  location_rating: { type: Number },
  location_total_rating: { type: Number },
  location_type: { type: String, required: true },
  location_phone_number: { type: String },
  location_website: { type: String },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
  activities: { type: Array },
  boundary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Polygon",
  },
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Location", Location);
