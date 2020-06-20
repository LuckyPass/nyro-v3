const mongoose = require("mongoose");

let schema = mongoose.Schema({
  ServerID: String,
  ServerName: String,
  IChannelID: String,
  IChannelName: String,
  Description: String,
  LeaveDesc: String,
  LeaveMsg: Boolean
})

module.exports = mongoose.model("imageWelcome", schema)