const {Client, Command} = require("discord.js-commando")
const { MessageEmbed } = require("discord.js");

module.exports = class joinrole extends Command {
  constructor(client) {
    super(client, {
      name: "joinrole",
      memberName: "joinrole",
      group: "welcome",
      description:
        "Set a join role for your server.",
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["MANAGE_ROLES"],
      guildOnly: true,
      format: "(Role)"
    });
  }
  async run(message) {
     const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");
    var client = message.client;
   
if (message.member.hasPermission("MANAGE_ROLES")) {
const Joinrole = require("../../models/joinRole.js");
 
    if (args[1]) {
 let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1]);
      if (role != undefined) {
        Joinrole.findOne({ ServerID: message.guild.id }, async (err, joinRole) => {
          if (!joinRole) {
            const newMute = new Joinrole({
              ServerID: message.guild.id,
              JoinRoleName: role.name,
              JoinRoleID: role.id
            });
            newMute.save();
            
          let embezd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   `The join role for this server has been set!\nRole: \`${role.name}\``
            );
            return message.channel.send(embezd);
          } else {
            let same = new MessageEmbed()
            .setTitle("Cancelled!")
            .setColor("BLACK")
            .setDescription(":x: That role have been already set!.")
            if(joinRole.JoinRoleID === role.id) return message.channel.send(same)
            message.channel.send(`Another set join role has been found on this server!\nRole: \`${joinRole.JoinRoleName}\`\nID:\`${joinRole.JoinRoleID}\`\nType \`yes\` to update the role`);
            message.channel
              .awaitMessages(m => m.content.toLowerCase() == "yes", {
                time: 30000,
                max: 2,
                errors: ["time"]
              })
              .then(async collected => {
                if (collected.first().content == "yes") {
                  joinRole.JoinRoleName = role.name;
                  joinRole.JoinRoleID = role.id;
                  joinRole.updated = true;
                  await joinRole.save();
                  const embed = new MessageEmbed()
                    .setTitle("Updated!")
                    .setColor("#000000")
                    .setDescription("Role updated!")
                    .addField("Role", `${role} (${role.name}, ${role.id})`)
                    .setTimestamp();
                  return message.channel.send(`Role Updated!\nRole: ${role.name}\nID: ${role.id}`);
                }              })
              .catch(err => {
                const embed = new MessageEmbed()
                  .setTitle("Command Cancelled")
                  .setColor("#000000")
                  .setDescription(":exclamation: Command has been cancelled")
                  .setTimestamp();
                return message.channel.send(embed);
              });
          }
        });
      } else {
        
          let embezzd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   "Role not found!"
            );
        return message.channel.send(embezzd);
      }
    } else {
      
          let embezzd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   "This is how properly set the join role\n\`n!joinrole @Role\`"
            );
      return message.channel.send(embezzd);
    }
   }else{
      const embed = new MessageEmbed()
        .setTitle("Not enough permissions")
        .setColor("#ff00ff")
        .setDescription(
          ":x: You need the `MANAGE_ROLES` permission!."
        )
        .setTimestamp();
      return message.channel.send(embed);    
   }
  }
}