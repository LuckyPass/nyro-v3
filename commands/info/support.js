const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class support extends Command {
  constructor(client) {
    super(client, {
      name: "support",
      memberName: "support",
      group: "info",
      description: "Get a link to our support server.",
      guarded: true,
      format: ""
    });
  }
  async run(message) {
let {MessageEmbed} = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("Support server")
        .setColor("RANDOM")
        .setDescription("Join the bot's support server by clicking [here](https://discord.gg/VxekezZ).")
        message.channel.send(embed);
}
}