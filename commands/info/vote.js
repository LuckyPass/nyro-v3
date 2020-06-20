const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class invite extends Command {
  constructor(client) {
    super(client, {
      name: "vote",
      memberName: "vote",
      group: "info",
      description: "Vote for Nik's Utilities",
      guarded: true,
      format: ""
    });
  }
  async run(message) {
      
let {MessageEmbed} = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("Vote for Nik's Utilities")
        .setColor("RANDOM")
        .setDescription("You would make us a very big favour by voting for Nik's Utilities [here](https://top.gg/bot/702214772749238392/vote).")
        message.channel.send(embed)
    }
  }