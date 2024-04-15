const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rating = new Schema({
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
  rating_score: { type: Number, default: 5 },
  rating_detail: { type: String },
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Rating", Rating);
