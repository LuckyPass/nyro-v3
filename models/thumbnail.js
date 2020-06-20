const mongoose = require("mongoose");

let Schmea =  mongoose.Schema({
  ServerID: String,
  ServerName: String,
  Thumbnail: String
})
module.exports = mongoose.model("Thumbnail", Schmea);