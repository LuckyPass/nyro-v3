const {Client, Command} = require("discord.js-commando")
const { MessageEmbed } = require("discord.js");
const logs = require("../../models/logs.js");

module.exports = class setlogs extends Command {
  constructor(client) {
    super(client, {
      name: "setlogs",
      memberName: "setlogs",
      group: "moderation",
      description:
        "Set the logging channel on your server.",
      guildOnly: true,
      format: "(channel)"
    });
  }
  async run(message) {
     const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");
    var client = message.client;
    
    if (
      message.member.hasPermission("MANAGE_CHANNELS", {
        checkAdmin: true,
        checkOwner: true
      })
    ) {
      if (args[1]) {
        var chnl;
        if (message.mentions.channels) {
          chnl = message.mentions.channels.first();
        } else {
          chnl = message.guild.channels.cache.get(args.slice(1).join(" "));
        }
        if (chnl != undefined) {
          logs.findOne({ ServerID: message.guild.id }, async (err, log) => {
            if (!log) {
              const newLog = new logs({
                ServerID: message.guild.id,
                ServerName: message.guild.name,
                Channel: chnl.name,
                ID: chnl.id
              });
              newLog.save();
              const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription("The log channel for this server has been set")
                .addField("Channel", `${chnl}`)
                .setTimestamp();
              return message.channel.send(embed);
            } else {
              let same = new MessageEmbed()
                .setTitle("Cancelled!")
                .setColor("RANDOM")
                .setDescription("That channel has already been set!.");
              if (log.ID === chnl.id) return message.channel.send(same);
              const embedd = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription("A set channel has been found in this server")
                .addField(
                  "Channel",
                  `${message.guild.channels.cache.get(log.ID)}`
                )
                .addField("Channel Name", log.Channel)
                .addField(
                  "Do you want to update the channel?",
                  `New channel: ${chnl} Type \`yes\` if you want to update the channel`
                )
                .setTimestamp();
              message.channel.send(embedd).then(embedd => {
                message.channel
                  .awaitMessages(m => m.content.toLowerCase() == "yes", {
                    time: 30000,
                    max: 1,
                    errors: ["time"]
                  })
                  .then(async collected => {
                    if (collected.first().content == "yes") {
                      log.Channel = chnl.name;
                      log.ID = chnl.id;
                      log.updated = true;
                      await log.save();
                      const embeEd = new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription("Channel Updated!")
                        .addField("Channel", `${chnl}`)      
                        .addField("Name", chnl.name)
                        .setTimestamp();
                      message.channel.send(embeEd);
                    }
                  })
                  .catch(err => {
                    const embed = new MessageEmbed()
                      .setTitle("Command Cancelled")
                      .setColor("RANDOM")
                      .setDescription(
                        "Command has been cancelled"
                      )
                      .setTimestamp();
                    return message.reply(embed);
                  });
              });
            }
          });
        } else {
          const embed = new MessageEmbed()
            .setTitle("Err")
            .setColor("RANDOM")
            .setDescription(
              ":x: That channel could not be found in this server"
            )
            .setTimestamp();
          return message.channel.send(embed);
        }
      } else {
        const embed = new MessageEmbed()
          .setTitle("Not enough arguments")
          .setColor("RANDOM")
          .setDescription(
            ":x: You need to provide a channel to set as the log channel."
          )
          .setTimestamp();
        return message.channel.send(embed);
      }
    } else {
      const embed = new MessageEmbed()
        .setTitle("Not enough permissions")
        .setColor("#FF00FF")
        .setDescription(":x: You need the `MANAGE_CHANNELS` permission!.")
        .setTimestamp();
      return message.channel.send(embed);
    }
}
}