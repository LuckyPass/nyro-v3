const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const version = require("../../package.json").version;
const client = new Client();

module.exports = class changelogs extends Command {
  constructor(client) {
    super(client, {
      name: "changelogs",
      memberName: "changelogs",
      group: "info",
      description: "View whats changed in the new update.",
      guarded: true,
      format: ""
    });
  }
  async run(message) {
      
let {MessageEmbed} = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("Updates")
        .setColor("RANDOM")
        .setDescription(`V${version}\nWhats changed?\nAdded music`)
        message.channel.send(embed)
    }
  }