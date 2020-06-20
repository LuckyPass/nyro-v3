const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

const Queue = require("../../classes/Queue");
const Rest = require("../../classes/Rest");

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: ["pl"],
      group: "music",
      memberName: "play",
      description: "Play music",
      guildOnly: true,
      args: [
        {
          key: "track",
          prompt: "What would you like to play?",
          type: "string",
        },
      ],
    });
  }

  async run(message, { track }) {
    if (!track) return message.reply(`you gotta supply a track my dude`);

    const { channel } = message.member.voice;
    if (!channel) return message.reply(`oi join a voice channel ya cunt`);

    const player =
      this.client.music.players.get(message.guild.id) ||
      (await this.client.music.join(
        {
          channel: channel.id,
          guild: message.guild.id,
        },
        { deaf: true }
      ));

    if (!player.queue) player.queue = new Queue(player);

    const { tracks, loadType, playlistInfo } = await Rest.search(
      track.includes("https://")
        ? track.replace(/<(.+)>/g, "$1")
        : `ytsearch:${track}`
    );

    switch (loadType) {
      case "LOAD_FAILED":
      case "NO_MATCHES":
        return message.channel.send(`Nothing was found for that search query.`);

      case "TRACK_LOADED":
        await player.queue.add(tracks[0].track, message.author.id);

        message.channel.send(
          new MessageEmbed()
            .setColor("#db8127")
            .setThumbnail(
              `https://i.ytimg.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`
            )
            .setDescription(
              `Enqueued Track:\n\n[${tracks[0].info.title}](${tracks[0].info.uri})`
            )
        );

        if (!player.playing && !player.paused)
          await player.queue.start(message);
        break;

      case "SEARCH_RESULT":
        const songs = tracks.slice(0, 5);

        const filter = (msg) => msg.author.id === message.author.id;

        const msg = await message.channel.send(
          new MessageEmbed()
            .setColor("#db8127")
            .setDescription(
              songs.map(
                (track, index) =>
                  `\`#${index + 1}\` [${track.info.title}](${track.info.uri})`
              )
            )
            .setFooter(`Pick a song 1-${songs.length}`)
        );

        message.channel
          .awaitMessages(filter, { time: 3e4, max: 1, errors: ["time"] })
          .then(async (collected) => {
            const first = collected.first();

            if (first.content.toLowerCase() === "cancel")
              return message.channel.send("Cancelled selection...");
            if (isNaN(first.content) || Number(first.content) > songs.length)
              return message.channel.send(
                "That's not a valid number for this selection.."
              );

            player.queue.add(
              songs[Number(first.content) - 1].track,
              message.author.id
            );

            if (first.deletable) await first.delete();

            message.channel.send(
              new MessageEmbed()
                .setColor("#db8127")
                .setThumbnail(
                  `https://i.ytimg.com/vi/${
                  songs[Number(first.content) - 1].info.identifier
                  }/hqdefault.jpg`
                )
                .setDescription(
                  `Enqueued Track:\n\n[${
                  songs[Number(first.content) - 1].info.title
                  }](${songs[Number(first.content) - 1].info.uri})`
                )
            );

            msg.delete();

            if (!player.playing && !player.paused)
              await player.queue.start(message);
          })
          .catch(() => {
            return message.channel.send(
              "Welp that's awkward, selection is cancelled now."
            );
          });
        break;

      case "PLAYLIST_LOADED":
        tracks.forEach((track) =>
          player.queue.add(track.track, message.author.id)
        );

        message.channel.send(
          new MessageEmbed()
            .setColor("#db8127")
            .setThumbnail(
              `https://i.ytimg.com/vi/${tracks[0].info.identifier}/hqdefault.jpg`
            )
            .setDescription(`Enqueued Playlist:\n\n${playlistInfo.name}`)
        );

        if (!player.playing && !player.paused)
          await player.queue.start(message);

        break;
    }
  }
};