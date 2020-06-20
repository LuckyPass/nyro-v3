const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const osu = require("node-os-utils");
module.exports = class botinfo extends Command {
  constructor(client) {
    super(client, {
      name: "botinfo",
      group: "info",
      memberName: "botinfo",
      description: "Info about the bot",
    });
  }
  async run(message) {
    const client = message.client;
    function duration(ms) {
      const times = {
        day: Math.floor(ms / (1000 * 60 * 60 * 24)),
        hour: Math.floor((ms / (1000 * 60 * 60)) % 24),
        minute: Math.floor((ms / (1000 * 60)) % 60),
        second: Math.floor((ms / 1000) % 60),
        week: Math.floor(ms / (1000 * 60 * 60 * 24 * 7))
      };

      let string = "";

      for (const [key, value] of Object.entries(times)) {
        if (value > 0) string += ` ${value} ${key}${value > 1 ? "s " : ""}`;
      }
      return `\`${string}\``;
    }
    let uptime = duration(client.uptime);
    let bicon = client.user.displayAvatarURL();
    osu.cpu.usage().then(cpu => {
      osu.mem.info().then(mem => {
        let embed = new MessageEmbed()
          .setTitle("Information")
          .setColor("fff300")
          .setThumbnail(bicon)
          .addField("Bot name", client.user.tag, true)
          .addField("Library", `discord.js V12`, true)
          .addField("CPU Usage", cpu + "%", true)
          .addField(
            "Memory Usage",
            `${Math.floor(100 - mem.freeMemPercentage)}%`,
            true
          )
          .addField("Uptime", uptime);
        message.channel.send(embed);
      });
    });
  }
};