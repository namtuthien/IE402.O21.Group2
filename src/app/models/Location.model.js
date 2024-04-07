const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Location = new Schema({
  _id: {type: ObjectId},
  name: {type: String},
  area: {type: ObjectId},
  description: {type: String},
  activity_list: {type: Array},
  coordinate: {type: ObjectId},
  boundary: {type: Array},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
});
module.exports = mongoose.model('Location', Location)