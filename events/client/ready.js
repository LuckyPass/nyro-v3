let {Client} = require("discord.js-commando");
const client = new Client()

module.exports = function() {

console.log(`Logged in as ${client.user.tag}!`); //log when the bot is ready to be used

}