const { Command } = require("discord.js-commando");

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      aliases: ["repeat"],
      group: "music",
      memberName: "loop",
      description: "Loops the track or song",
      guildOnly: true,
      userPermissions: ["MANAGE_CHANNELS"],
      args: [
        {
          key: "type",
          prompt: "What would you like to repeat? Queue or Song?",
          type: "string",
          oneOf: ["queue", "song"],
        },
      ],
    });
  }

  async run(message, { type }) {
    const player = this.client.music.players.get(message.guild.id);
    if (!player)
      return message.reply(`there's no queue running at the moment.`);

    if (message.member.voice.channel !== message.guild.me.voice.channel)
      return message.reply(`join my voice channel`);

    player.queue.repeat[type.toLowerCase()] = !player.queue.repeat[
      type.toLowerCase()
    ];
    const opposite = type.toLowerCase() === "queue" ? "song" : "queue";
    player.queue.repeat[opposite] = false;

    return message.channel.send(
      `${
        player.queue.repeat[type] === false ? `Stopped` : `Started`
      } looping the ${type.toLowerCase()}.`
    );
  }
};
