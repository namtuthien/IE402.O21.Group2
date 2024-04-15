const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Payment = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  payment_amount: { type: Number, required: true },
  payment_total_price: { type: Number, required: true },
  //   note: { type: String },
  payment_gateway: { type: String },
  payment_status: { type: String, required: true },
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Payment", Payment);
