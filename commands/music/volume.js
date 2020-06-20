const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      aliases: ["vol"],
      group: "music",
      memberName: "volume",
      description: "Changes the volume of the player.",
      guildOnly: true,
      userPermissions: ["MANAGE_CHANNELS"],
    });
  }

  run(message) {
    const player = this.client.music.players.get(message.guild.id);
    if (!player)
      return message.reply(`there's no queue running at the moment.`);

    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.reply(`join my voice channel`)

    const args = message.content
      .slice(message.guild.commandPrefix.length)
      .trim()
      .split(/ +/g);

    if (!args[1])
      return message.channel.send(
        new MessageEmbed()
          .setColor("#db8127")
          .setDescription(
            `The current player's volume is: **${player.volume}/100**`
          )
      );

    if (isNaN(args[1]) || Number(args[1]) > 100 || Number(args[1]) < 1)
      return message.reply(`invalid number.`);

    player.setVolume(Number(args[1]));

    return message.reply(`set the players volume to: **${args[1]}**`);
  }
};