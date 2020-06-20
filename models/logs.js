const mongoose = require("mongoose")

let Schema = mongoose.Schema({
  ServerName: String,
  ServerID: String,
  Channel: String,
  ID: String
})
module.exports = mongoose.model("log", Schema);