const mongoose = require("mongoose");

let schema = mongoose.Schema({
  ServerID: String,
  ServerName: String,
  MuteRoleID: String,
  MuteRoleName: String
})

module.exports = mongoose.model("mute", schema)