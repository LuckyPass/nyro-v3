const { Command } = require("discord.js-commando");
const { decode } = require("@lavalink/encoding");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      aliases: ["q", "tracks"],
      group: "music",
      memberName: "queue",
      description: "Displays the queue",
      guildOnly: true,
      args: [
        {
          key: "page",
          prompt: "",
          type: "integer",
          default: 1,
        },
      ],
    });
  }

  async run(message, { page }) {
    const player = this.client.music.players.get(message.guild.id);
    if (!player)
      return message.reply(`there's no queue running at the moment.`);

    const maxPages = Math.ceil(player.queue.length / 10);
    if (page > maxPages || page < 1) page = 1;

    const { title, uri, length } = decode(player.queue.current.song);

    const embed = new MessageEmbed()
      .setColor("#db8127")
      .setAuthor(
        `Queue | ${message.guild.name}`,
        message.guild.iconURL({ dynamic: true })
      )
      .setDescription(
        `[${title}](${uri}) [\`${this.time(
          Number(player.state.position)
        )}/${this.time(Number(length))}\`]`
      );

    if (!player.queue.next.length) {
      return message.channel.send(embed);
    }

    const items = player.queue.next.map((track, index) => {
      const { uri, title } = decode(track.song);

      return { uri, title, rank: index + 1 };
    });

    const display = items.slice((page - 1) * 10, page * 10);

    return message.channel.send(
      embed
        .addField(
          `Enqueued Tracks: (${player.queue.next.length})`,
          display.map(
            (data) => `\`#${data.rank}\` [${data.title}](${data.uri})`
          )
        )
        .setFooter(
          `Queue Length: ${ms(
            player.queue.next.reduce(
              (prev, curr) => prev + Number(decode(curr.song).length),
              0
            ) + Number(decode(player.queue.current.song).length),
            { long: true }
          )}`
        )
    );
  }

  time(duration) {
    const hrs = Math.floor((duration / (1e3 * 60 * 60)) % 60),
      mins = Math.floor(duration / 6e4),
      secs = ((duration % 6e4) / 1e3).toFixed(0);

    return `${
      hrs ? `${hrs.toString().padStart(2, "0")}:` : ""
      }${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
};