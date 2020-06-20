const { Client, Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class clear extends Command {
  constructor(client) {
    super(client, {
      name: "clear",
      memberName: "clear",
      group: "moderation",
      description: "Clean messages in the channel.",
      guildOnly: true,
      format: "(number)",
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async run(message) {
    var client = message.client;
    const args = message.content
      .slice(message.guild.commandPrefix.length)
      .split(" ");

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      let embed = new MessageEmbed()
        .setColor("#ffa500")
        .setDescription("You do not have 'MANAGE_MESSAGES' permission!");
      return message.reply(embed);
    }
    let deleteAmount = args[1];

    if (isNaN(deleteAmount)) {
      return message.channel.send("Provide a number next time");
    }

    if (deleteAmount < 0 || deleteAmount > 100) {
      let embed = new MessageEmbed()
        .setColor("#ffa500")
        .setDescription(
          "You have to provide a number that is above 0 or less than 100!"
        );
      return message.reply(embed);
    }
    message.delete();
    message.channel
      .bulkDelete(deleteAmount, true)
      .then((deleted) => {
        let embed = new MessageEmbed()
          .setColor("#ffa500")
          .setDescription(`${deleted.size} message(s) deleted!`);
        return message.reply(embed);
      })
      .catch((err) => {
        let embed = new MessageEmbed()
          .setColor("#ffa500")
          .setDescription(`An error occured!;\n${err}`);
        return message.reply(embed);
      });
  }
};
