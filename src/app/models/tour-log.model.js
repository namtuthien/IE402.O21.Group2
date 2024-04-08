const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TourLog = new Schema({
  _id: { type: ObjectId },
  tour_guide_id: { type: ObjectId },
  tour_id: { type: ObjectId },
  log: [
    {
      current_time: { type: Date },
      longtitude: { type: String },
      latitude: { type: String },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("TourLog", TourLog);
