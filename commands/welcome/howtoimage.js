const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class invite extends Command {
  constructor(client) {
    super(client, {
      name: "howtoimage",
      memberName: "howtoimage",
      group: "welcome",
      description: "Tutorial on how to change welcome/leave messages image",
      guarded: true,
      format: "",
      aliases: ["image"]
    });
  }
  async run(message) {
      
let {MessageEmbed} = require("discord.js")
        let embed = new MessageEmbed()
        .setTitle("Nik's Utilities")
        .setColor("RANDOM")
        .setDescription("To correctly change the image of welcome/leave messages and know which link and how to get it please watch this [here](https://www.youtube.com/watch?v=dmq_7_Yu63U&t=6s)")
        message.channel.send(embed)
    }
  }