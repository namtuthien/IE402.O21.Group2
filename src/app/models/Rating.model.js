const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Area = new Schema({
  _id: {type: ObjectId},
  user_id: {type: ObjectId},
  tour_id: {type: ObjectId},
  score: {type: Number},
  detail: {type: String},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Area', Area)