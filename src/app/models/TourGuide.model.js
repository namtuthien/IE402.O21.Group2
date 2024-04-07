const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TourGuide = new Schema({
  _id: {type: ObjectId},
  name: {type: String},
  area: {type: ObjectId},
  age: {type: Number},
  sex: {type: String},
  current_position: {type: ObjectId},
  is_available: {type: Boolean},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.model('TourGuide', TourGuide)