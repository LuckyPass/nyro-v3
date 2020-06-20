const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class setmute extends Command {
  constructor(client) {
    super(client, {
      name: "setmute",
      memberName: "setmute",
      group: "moderation",
      description: "Set a muted role in your server.",
      userPermissions: ["MANAGE_ROLES"],
      clientPermissions: ["MANAGE_ROLES"],
      guarded: true,
      guildOnly: true,
      format: "(role)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
const Mutedrole = require("../../models/muteRole.js");
    
if (message.member.hasPermission("MANAGE_ROLES")) {
 
    if (args[1]) {
       let role = message.mentions.roles.first() || message.guild.roles.resolve(args[1]);
      if(!message.guild.roles.cache.get(role)){
        
           let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
        `Could not find the role`
            );
       return message.reply(embed)
      }
      if (role != undefined) {
        Mutedrole.findOne({ ServerID: message.guild.id }, async (err, mute) => {
          if (!mute) {
            const newMute = new Mutedrole({
              ServerID: message.guild.id,
              ServerName: message.guild.name,
              MuteRoleName: role.name,
              MuteRoleID: role.id
            });
            newMute.save();
            const embed = new MessageEmbed()
              .setTitle("Mute Role Set!")
              .setColor("GREEN")
              .setDescription("The mute role for this server has been set")
              .addField("Role", `${role}`)
            .addField("Role Name", role.name)
            .addField("ID", role.id)

              .setTimestamp();
            return message.channel.send(embed);
          } else {
            let same = new MessageEmbed()
            .setTitle("Cancelled!")
            .setColor("BLACK")
            .setDescription(":x: That role have been already set!.")
            if(mute.MuteRoleID === role.id) return message.channel.send(same)

            const embed = new MessageEmbed()
              .setTitle("Another Role Found")
              .setColor("GREEN")
              .setDescription("A set mute role has been found in this server")
              .addField(
                "Mute Role",
                `${message.guild.roles.cache.get(mute.MuteRoleID)}`
              )
            .addField("Role Name", mute.MuteRoleName)
            .addField("ID", mute.MuteRoleID)
              .addField(
                "Do you want to update the mute role?",
                `New role: ${role} (${role.name}). **Type \`yes\` if you want to update the mute role**`
              )
              .setTimestamp();
            message.channel.send(embed);
            message.channel
              .awaitMessages(m => m.content.toLowerCase() == "yes", {
                time: 30000,
                max: 1,
                errors: ["time"]
              })
              .then(async collected => {
                if (collected.first().content == "yes") {
                  mute.MuteRoleName = role.name;
                  mute.MuteRoleID = role.id;
                  mute.updated = true;
                  await mute.save();
                  const embed = new MessageEmbed()
                    .setTitle("Updated!")
                    .setColor("GREEN")
                    .setDescription("Role updated!")
                    .addField("Role", `${role} (${role.name}, ${role.id})`)

                    .setTimestamp();
                  return message.channel.send(embed);
                }              })
              .catch(err => {
                const embed = new MessageEmbed()
                  .setTitle("Command Cancelled")
                  .setColor("GREEN")
                  .setDescription(":exclamation: Command has been cancelled")
                  .setTimestamp();
                return message.channel.send(embed);
              });
          }
        });
      } else {
        const embed = new MessageEmbed()
          .setTitle("Err")
          .setColor("GREEN")
          .setDescription(":x: That role could not be found in this server")
          .setTimestamp();
        return message.channel.send(embed);
      }
    } else {
      const embed = new MessageEmbed()
        .setTitle("Not enough arguments")
        .setColor("GREEN")
        .setDescription(
          ":x: You need to provide a role to set as the mute role."
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
   }else{
      const embed = new MessageEmbed()
        .setTitle("Not enough permissions")
        .setColor("GREEN")
        .setDescription(
          ":x: You need the `MANAGE_ROLES` permission!."
        )
        .setTimestamp();
      return message.channel.send(embed);
     
   }
    }
  }