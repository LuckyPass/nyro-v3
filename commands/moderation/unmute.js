const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class unmute extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      memberName: "unmute",
      group: "moderation",
      description: "Unmute member in your server.",
      userPermissions: ["MANAGE_ROLES"],
      clientPermissions: ["MANAGE_ROLES"],
      guarded: true,
      guildOnly: true,
      format: "(user)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
const Mutedrole = require("../../models/muteRole.js");
    
  Mutedrole.findOne({ ServerID: message.guild.id }, async (err, mute) => {
      
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[1]);
  if(!toMute) {
    
           let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              "You did not specify a user mention or ID!"
            );
    message.channel.send(embed);
    }
  if(!mute.MuteRoleID || !toMute.roles.cache.has(mute.MuteRoleID)) {
    
           let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              "This user is not muted!"
            );
    message.channel.send(embed);
    }

let e = new MessageEmbed()
.setTitle("Unmute")
.setColor("GREEN")
.setThumbnail(toMute.user.displayAvatarURL)
.addField("Moderator", message.author.tag)
.addField("Performed on", toMute.user.tag)
.setTimestamp()
.setFooter(`Author: ${message.author.id} | To: ${toMute.id}`)
 await toMute.roles.remove(mute.MuteRoleID);
 message.reply("I have unmuted them.")   
  })
    }
  }