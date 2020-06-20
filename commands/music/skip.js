const { Command } = require("discord.js-commando");

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      aliases: ["next", "nextrack"],
      group: "music",
      memberName: "skip",
      description: "Skips the current song",
      guildOnly: true,
      userPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async run(message) {
    const player = this.client.music.players.get(message.guild.id);
    if (!player)
      return message.reply(`there's no queue running at the moment.`);

    if (message.member.voice.channel !== message.guild.me.voice.channel) return message.reply(`join my voice channel`)

    player.emit("end");

    return message.reply(`skipped the current song.`);
  }
};