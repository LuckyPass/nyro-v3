const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class invite extends Command {
  constructor(client) {
    super(client, {
      name: "invite",
      memberName: "invite",
      group: "info",
      description: "Get a link to invite the bot to your server",
      guarded: true,
      format: "",
      aliases: ["botinvite"]
    });
  }
  async run(message) {
      
let {MessageEmbed} = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("Nik's Utilities")
        .setColor("RANDOM")
        .setDescription("Thanks for being interested in Nik's Utilities! You can invite the bot to another server [here](https://discordapp.com/oauth2/authorize?client_id=702214772749238392&scope=bot&permissions=2146958847). Keep in mind that you need manage server or administrator permission to do this.")
        message.channel.send(embed)
    }
  }