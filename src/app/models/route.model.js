const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Route = new Schema({
  route_name: { type: String, required: true },
  route_description: { type: String },
  route_length: { type: Number },
  lines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Line",
      required: true,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Route", Route);
