const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Tour = new Schema({
  _id: { type: ObjectId },
  name: { type: String },
  area: { type: String },
  price: { type: Number },
  category: { type: String },
  number_of_days: { type: Number },
  number_of_nights: { type: Number },
  destination_list: { type: Array },
  vehicle: { type: Array },
  route: { type: Array },
  tour_guide: { type: ObjectId },
  description: { type: String },
  thumb_nail: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Tour", Tour);
