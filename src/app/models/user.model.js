const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  _id: { type: ObjectId },
  name: { type: String },
  email: { type: String },
  phone_number: { type: String },
  user_role: { type: String },
  is_authenticated: { type: Boolean },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model("User", User);
