const { EventEmitter } = require("events");
const { decode } = require("@lavalink/encoding");
const { MessageEmbed } = require("discord.js");

module.exports = class Queue extends EventEmitter {
  next = [];
  previous = [];
  current;
  repeat = { song: false, queue: false };
  message;

  constructor(player) {
    super();

    this.player = player;

    player
      .on("end", async (evt) => {
        if (evt && ["REPLACED", "STOPPED"].includes(evt.reason)) return;

        if (this.repeat.song) this.next.unshift(this.current);
        else if (this.repeat.queue) this.previous.unshift(this.current);

        this._next();

        if (!this.current) return this.emit("ended", "empty");
        await player.play(this.current.song);
      })
      .on("start", (track) => {
        const { uri, identifier, title } = decode(track);

        this.message.channel.send(
          new MessageEmbed()
            .setColor("#db8127")
            .setThumbnail(`https://i.ytimg.com/vi/${identifier}/hqdefault.jpg`)
            .setDescription(
              `[${title}](${uri})\n\nRequester: ${
              this.message.client.users.cache.get(this.current.id).tag
              }`
            )
        );
      });

    this.on("ended", async (reason) => {
      if (this.repeat.queue) {
        this.next.push(...this.previous);
        this.previous = [];
        return await this.start(this.message);
      }

      switch (reason) {
        case "empty":
        default:
          await this.clean();
          return this.message.channel.send(
            `Queue has emptied out, I will be leaving now. :wave:`
          );
      }
    });
  }

  add(song, id) {
    return this.next.push({ song, id });
  }

  _next() {
    return (this.current = this.next.shift());
  }

  async clean() {
    this.previous = [];
    this.next = [];
    this.nowplaying = undefined;
    this.repeat = { queue: false, song: false };

    await this.message.client.music.leave(this.message.guild.id);
  }

  async start(message) {
    this.message = message;
    if (!this.current) this._next();
    await this.player.play(this.current.song);
  }
};