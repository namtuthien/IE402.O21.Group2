const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  //   _id: { type: ObjectId },
  // user_login_name: { type: String, unique: true, required: true },
  user_name: { type: String, required: true },
  user_email: { type: String, unique: true, required: true },
  user_phone_number: { type: String },
  user_password: { type: String, required: true },
  user_role: { type: String, required: true, default:"customer" },
  //   is_authenticated: { type: Boolean },
  user_birthday: { type: Date },
  user_gender: { type: Boolean }, // 0: female, 1: male, -1; others
  user_address: {
    street: { type: String },
    ward: { type: String },
    district: { type: String },
    province: { type: String },
  },
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("User", User);
