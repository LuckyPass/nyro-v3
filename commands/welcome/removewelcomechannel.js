const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class removewelcomechannel extends Command {
  constructor(client) {
    super(client, {
      name: "removewelcomechannel",
      memberName: "removewelcomechannel",
      group: "welcome",
      description: "remove the welcome channel set in your server",
      clientPermissions: ["MANAGE_CHANNELS"],
      userPermissions: ["MANAGE_CHANNELS"],
      guarded: true,
      guildOnly: true,
      format: "",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
const Iw = require("../../models/imageWelcome.js");
    if (message.member.hasPermission("MANAGE_CHANNELS")) {
 
      Iw.findOne({ ServerID: message.guild.id }, async (err, imageWelcome) => {
        if (imageWelcome) {
          let embed2 = new MessageEmbed()
            .setTitle("Channel Found!")
            .setColor("RANDOM")
            .setTimestamp()
            .addField("Channel", `${imageWelcome.IChannelName} (${imageWelcome.IChannelID})`)
            .addField(
              "Confirmation",
              "type `yes` if you want to confirm removing the image welcome channel from the bot's database. ( 30secs until timeout )"
            );
          message.channel.send(embed2).then((embed2)=>{
          message.channel
            .awaitMessages(m => m.content.toLowerCase() == "yes", {
              time: 30000,
              max: 2
            })
            .then(async collected => {
              console.log(collected.first().content);
              if (collected.first().content.toLowerCase() == "yes") {
                await Iw.findOneAndDelete({
                  ServerID: message.guild.id
                });
                let embed = new MessageEmbed()
                  .setTitle("Deleted Successfully!")
                  .setColor("RANDOM")
                  .setDescription(
                    "The image welcome channel has been removed from the database successfully."
                  )
                  .setTimestamp();
                message.channel.send(embed);
              }
            })
            .catch(() => {
              const embed = new MessageEmbed()
                .setTitle("Cancelled")
                .setColor("RANDOM")
                .setDescription(":x: Command has been cancelled")
                .setTimestamp();
              return embed2.edit(embed);
            })
            });
        } else {
          let embed = new MessageEmbed()
            .setTitle("Not Found!")
            .setColor("RANDOM")
            .setDescription(
              "There is no current set image welcome channel for this server."
            )
            .setTimestamp();
          message.channel.send(embed);
        }
      });
    } else {
      let embed = new MessageEmbed()
        .setTitle("Not Enough Permissions!")
        .setColor("RED")
        .setDescription(":x: You do not have the 'MANAGE_CHANNELS' permission!")
        .setTimestamp();

      message.channel.send(embed);
    }    }
  }