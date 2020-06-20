const { Command } = require("discord.js-commando");

const bands = {
  high: 0.1,
  medium: 0.06,
  low: 0.03,
  none: 0,
};

module.exports = class BassboostCommnad extends Command {
  constructor(client) {
    super(client, {
      name: "bassboost",
      aliases: ["bb"],
      group: "music",
      memberName: "bassboost",
      description: "Changes the bass on the player.",
      guildOnly: true,
      userPermissions: ["MANAGE_CHANNELS"],
      args: [
        {
          key: "level",
          prompt:
            "What level of bass would you like? High, medium, low, or none?",
          type: "string",
          oneOf: ["high", "medium", "low", "none"],
        },
      ],
    });
  }

  async run(message, { level }) {
    const player = this.client.music.players.get(message.guild.id);
    if (!player)
      return message.reply(`there's no queue running at the moment.`);

    if (message.member.voice.channel !== message.guild.me.voice.channel)
      return message.reply(`join my voice channel`);

    player.equalizer(
      Array(6)
        .fill(null)
        .map((_, i) => ({ band: i++, gain: bands[level.toLowerCase()] }))
    );

    return message.channel.send(
      `Set the bassboost level to ${level.toLowerCase()}`
    );
  }
};
