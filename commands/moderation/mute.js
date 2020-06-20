const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class mute extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      memberName: "mute",
      group: "moderation",
      description: "mute a member in your server",
      guarded: true,
      guildOnly: true,
      userPermissions: ["MANAGE_MESSAGES"],
      clientPermissions: ["MANAGE_ROLES"],
      format: "(member) (reason)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
const Mutedrole = require("../../models/muteRole");
      
  Mutedrole.findOne({ ServerID: message.guild.id }, async (err, mute) => {
  if(!mute) {
    let embed = new MessageEmbed()
    .setDescription("The muted role isnt set! Please do `n!setmute <muteRole>`")
    .setColor("RANDOM")
   return message.channel.send(embed);
  }
  let role = message.guild.roles.fetch(mute.MuteRoleID); 
  let toMute = message.mentions.members.first();
    
    if(!role){
      
    let embed = new MessageEmbed()
    .setDescription("Couldnt get the role")
    .setColor("RANDOM")
   return message.channel.send(embed);
    }
  if(!toMute) {
    
    let embed = new MessageEmbed()
    .setDescription("You did not specify a user mention!")
    .setColor("RANDOM")
   return message.channel.send(embed);
    }
  	let reason = args.slice(1).join(" ")
  if(toMute.id === message.author.id) {
    
    let embed = new MessageEmbed()
    .setDescription("You cannot mute yourself!")
    .setColor("RANDOM")
   return message.channel.send(embed);
    }
      
  if(toMute.roles.cache.has(mute.MuteRoleID)) {
    
    let embed = new MessageEmbed()
    .setDescription("This user is already muted!")
    .setColor("RANDOM")
   return message.channel.send(embed);
    } 
 await toMute.roles.add(mute.MuteRoleID)
    
    
    let embed = new MessageEmbed()
    .setDescription(`The user has been muted for: ${reason}`)
    .setColor("RANDOM")
 return message.channel.send(embed)          
    
if(err){
 return message.channel.send(err)
}      
  })
    }
  }