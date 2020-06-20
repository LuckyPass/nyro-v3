const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class removemute extends Command {
  constructor(client) {
    super(client, {
      name: "removemute",
      memberName: "removemute",
      group: "moderation",
      description: "remove the mute role set in your server",
      clientPermissions: ["MANAGE_ROLES"],
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
   
const Mutedrole = require("../../models/muteRole.js");
      
    if (message.member.hasPermission("MANAGE_ROLES")) {
 
      Mutedrole.findOne({ ServerID: message.guild.id }, async (err, mute) => {
        if (mute) {
          let embed = new MessageEmbed()
            .setTitle("Mute Role Found!")
            .setColor("GREEN")
            .setTimestamp()
            .addField("Role", `${mute.MuteRoleName}`)
          .addField("ID", mute.MuteRoleID)
            .addField(
              "Confirmation",
              "type `yes` if you want to confirm removing the mute role from the bot's database. ( 30secs until timeout )"
            );
          message.channel.send(embed);
          message.channel
            .awaitMessages(m => m.content.toLowerCase() == "yes", {
              time: 30000,
              max: 2
            })
            .then(async collected => {
              if (collected.first().content.toLowerCase() == "yes") {
                await Mutedrole.findOneAndDelete({
                  ServerID: message.guild.id
                });
                let embed = new MessageEmbed()
                  .setTitle("Deleted Successfully!")
                  .setColor("GREEN")
                  .setDescription(
                    "The mute role has been removed from the database successfully."
                  )
                  .setTimestamp();
                message.channel.send(embed);
              }
            })
            .catch(() => {
              const embed = new MessageEmbed()
                .setTitle("Cancelled")
                .setColor("GREEN")
                .setDescription(":x: Command has been cancelled")
                .setTimestamp();
              return message.channel.send(embed);
            });
        } else {
          let embed = new MessageEmbed()
            .setTitle("Not Found!")
            .setColor("GREEN")
            .setDescription(
              "There is no current set mute role for this server."
            )
            .setTimestamp();
          message.channel.send(embed);
        }
      });
    } else {
      let embed = new MessageEmbed()
        .setTitle("Not Enough Permissions!")
        .setColor("RED")
        .setDescription(":x: You do not have the 'MANAGE_ROLES' permission!")
        .setTimestamp();

      message.channel.send(embed);
    }
    }
  }