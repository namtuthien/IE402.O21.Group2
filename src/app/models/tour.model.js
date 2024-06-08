const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tour = new Schema({
  tour_name: { type: String, required: true },
  // region: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Region",
  //   required: true,
  // },
  tour_price: { type: Number, required: true },
  tour_category: [{ type: String }],
  tour_starting_day: { type: Date },
  tour_number_of_days: { type: Number },
  tour_number_of_nights: { type: Number },
  tour_description: { type: String },
  tour_total_ticket: { type: Number, required: true },
  tour_total_ticket_available: { type: Number, required: true },
  tour_average_rating: { type: Number, default: 0 },
  tour_total_rating: { type: Number, default: 0 },
  tour_images: [
    {
      link: { type: String },
      alt: { type: String },
    },
  ],
  destinations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
    },
  ],
  routes: [
    {
      start_coordinate: {
        longitude: { type: Number },
        latitude: { type: Number },
      },
      end_coordinate: {
        longitude: { type: Number },
        latitude: { type: Number },
      },
      route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
      },
    },
  ],
  vehicles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
  guides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Tour", Tour);
