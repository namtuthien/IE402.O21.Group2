const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  booking_amount: { type: Number, required: true },
  booking_total_price: { type: Number, required: true },
  booking_note: { type: String },
  // booking_date: { type: Date },
  booking_status: { type: String, required: true },
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Booking", Booking);
