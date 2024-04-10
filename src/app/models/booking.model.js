const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Region = new Schema({
  _id: { type: ObjectId },
  user_id: { type: ObjectId },
  tour_id: { type: ObjectId },
  amount: { type: Number },
  total_price: { type: Number },
  note: { type: String },
  booking_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Region", Region);
