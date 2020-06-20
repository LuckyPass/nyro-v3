const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class patreon extends Command {
  constructor(client) {
    super(client, {
      name: "patreon",
      memberName: "patreon",
      group: "info",
      description: "Get a link to our patreon",
      guarded: true,
      format: ""
    });
  }
  async run(message) {
        message.react("❤️");
        let embed = new MessageEmbed()
        .setTitle("Bot's Patreon")
        .setColor("RANDOM")
        .setDescription("Hi guys, hope you are all well. As you know, a lot of work, time, and money is going into making this bot, and it’s all coming out of my pocket. If you’d like to support us while we undergo the time and effort we put into the bot, we have now setup a very reasonable patreon, the cheapest being $1! I hope you all understand why we have set this up, and for a small amount every month, you can help support the development [here](https://www.patreon.com/NiksUtilities)")
         message.channel.send(embed);
  }
  }