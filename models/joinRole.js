const mongoose = require("mongoose");

let schema = mongoose.Schema({
  ServerID: String,
  JoinRoleName: String,
  JoinRoleID: String
})
module.exports = mongoose.model("joinRole", schema);
