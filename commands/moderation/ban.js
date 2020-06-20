const { Command, Client } = require("discord.js-commando");
const discord = require("discord.js");
const config = require("../../config.js");

module.exports = class ban extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      memberName: "ban",
      group: "moderation",
      description: "Ban a member in your server",
      guarded: true,
      guildOnly: true,
      format: "(User) (reason)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");

if(!message.member.hasPermission("BAN_MEMBERS")) {
  
    let embed = new discord.MessageEmbed()
    .setDescription(`You do not have perms to ban someone`)
    .setColor("#ff2050")
      return message.reply(embed)
    }
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      
    let embed = new discord.MessageEmbed()
    .setDescription(`I do not have perms to ban someone`)
    .setColor("#ff2050")
      return message.channel.send(embed)
    }
    
    const target = message.mentions.members.first();
    
    if(!target) {
      
    let embed = new discord.MessageEmbed()
    .setDescription(`Please mention the person who you want to ban.`)
    .setColor("#ff2050")
      return message.reply(embed)
    }
    
    if(target.id === message.author.id) {
      
    let embed = new discord.MessageEmbed()
    .setDescription(`You can not ban yourself!`)
    .setColor("#ff2050")
      return message.reply(embed)
    }
    
   
    
   if(!args[2]) {
     
    let embed = new discord.MessageEmbed()
    .setDescription(`Please Give Reason To ban Member`)
    .setColor("#ff2050")
     return message.channel.send(embed)
   }
    
    let embed = new discord.MessageEmbed()
    .setTitle("Action : Ban")
    .setDescription(`Banned ${target} (${target.id})`)
    .setColor("#ff2050")
    .setThumbnail(target.avatarURL)
    .setFooter(`Banned by ${message.author.tag}`);
    
    message.channel.send(embed)
    target.ban(args[2])
    
  }
  }