const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  ServerID: String,
  Category: String,
  Chnl1: String,
  Chnl2: String,
  Chnl3: String
})
module.exports = mongoose.model("stats", Schema);
