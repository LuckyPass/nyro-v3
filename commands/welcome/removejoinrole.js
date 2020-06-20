const {Client, Command} = require("discord.js-commando")
const { MessageEmbed } = require("discord.js");

module.exports = class removejoinrole extends Command {
  constructor(client) {
    super(client, {
      name: "removejoinrole",
      memberName: "removejoinrole",
      group: "welcome",
      description:
        "Remove the set join role from your server.",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_ROLES"],
      guildOnly: true,
    });
  }
  async run(message) {
     const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");
    var client = message.client;
    
if (message.member.hasPermission("MANAGE_ROLES")) {
const Joinrole = require("../../models/joinRole.js");
 
      Joinrole.findOne({ ServerID: message.guild.id }, async (err, joinRole) => {
        if (joinRole) {
      
          let embezzd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   `Join Role found!\nRole: ${joinRole.JoinRoleName}\nID: ${joinRole.JoinRoleID}\nType \`yes\` to confirm removal ( 30 secs )`
            );
          message.channel.send(embezzd);
          message.channel
            .awaitMessages(m => m.content.toLowerCase() == "yes", {
              time: 30000,
              max: 2
            })
            .then(async collected => {
              if (collected.first().content.toLowerCase() == "yes") {
                await Joinrole.findOneAndDelete({
                  ServerID: message.guild.id
                });
                let embed = new MessageEmbed()
                  .setTitle("Deleted Successfully!")
                  .setColor("GREEN")
                  .setDescription(
                    "The join role has been removed from the database successfully."
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
          
          let embezzzd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   ":x: There is no set join role found in this server!"
            );
          message.channel.send(embezzzd);
        }
      });
    } else {
      
          let embezzzd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   "You need \`MANAGE_ROLES\` permission!"
            );
      message.channel.send(embezzzd);
    }
    }
  }