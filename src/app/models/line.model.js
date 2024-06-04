const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Line = new Schema({
  points: [
    {
      longitude: { type: String, required: true },
      latitude: { type: String, required: true },
    },
  ],
  created_at: { type: Date, default: () => Date.now() },
  updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Line", Line);
