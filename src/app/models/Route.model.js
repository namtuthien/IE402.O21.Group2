const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Route = new Schema({
  _id: {type: ObjectId},
  start_location: {type: ObjectId},
  destination: {type: ObjectId},
  length: {type: Number},
  poly_line: {type: Array},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Route', Route)