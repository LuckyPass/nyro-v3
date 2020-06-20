const { Client, Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class nukechannel extends Command {
  constructor(client) {
    super(client, {
      name: "nukechannel",
      memberName: "nukechannel",
      group: "moderation",
      description: "Completely clear messages from a channel.",
      guildOnly: true,
      format: "(channel)",
      clientPermissions: ["MANAGE_CHANNELS"],
      userPermissions: ["MANAGE_CHANNELS"]
    });
  }
  async run(message) {
    const args = message.content
      .slice(message.guild.commandPrefix.length)
      .split(" ");
    var client = message.client;

      if (args[1]) {
        let channels = message.mentions.channels.first() || message.guild.channels.resolve(args[1]);
        if (!channels) {
          let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
        " Please provide me a channel to nuke!"
            );
          return message.channel.send(embed);
        }

        let pos = [];
        pos.push(channels.position);
        channels.delete().then(() => {
          channels.clone().then(async channel => {
            await channel.setPosition(pos);
            channel.send("Successfully nuked this channel!");
          });
        });
      }else{
         let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
        " Please provide me a channel to nuke!"
            );
        message.reply(embed)
      }
  }
};