const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb+srv://Nhom2Tour:Nhom2Tour@twotour.1szwhqn.mongodb.net/");
    console.log("connection created!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
