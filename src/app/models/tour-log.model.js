const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TourLog = new Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  tour_guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  logs: [
    {
      current_time: { type: Date, required: true },
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  ],
  created_at: { type: Date, default: () => Date.now },
  updated_at: { type: Date, default: () => Date.now },
});

module.exports = mongoose.model("TourLog", TourLog);
