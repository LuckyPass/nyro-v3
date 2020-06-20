const mongoose = require("mongoose")

const Schema = mongoose.Schema({
  GuildName: String,
  GuildID: String,
  Owner: String,
  Prefix: String
})
module.exports = mongoose.model("prefix", Schema)