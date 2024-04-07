const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Area = new Schema({
  _id: {type: ObjectId},
  polygons:{type: Array},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Area', Area)