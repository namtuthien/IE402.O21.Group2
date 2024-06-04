const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Region = new Schema({
  region_name: { type: String, required: true },
  region_description: { type: String },
  polygons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Polygon",
      required: true,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Region", Region);
