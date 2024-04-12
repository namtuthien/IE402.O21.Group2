const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Location = new Schema({
  _id: { type: ObjectId },
  name: { type: String },
  region: { type: ObjectId },
  description: { type: String },
  activity_list: { type: Array },
  coordinate: {
    longtitude: { type: String },
    latitude: { type: String },
  },
  boundary: { type: Array },
  address: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Location", Location);
