const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class kick extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      memberName: "kick",
      group: "moderation",
      description: "kick a member in your server",
      guarded: true,
      guildOnly: true,
      format: "(member) (reason)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");

   
    if(!message.member.hasPermission("KICK_MEMBERS")) {
      let embed = new MessageEmbed()
    .setTitle("You do not have enough permission to use this command")
    .setColor("RANDOM")
      return message.channel.send(embed)
    }
    
    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      
      let embed = new MessageEmbed()
    .setTitle("I do not have enough permission to use this command")
    .setColor("RANDOM")
      return message.channel.send(embed)
    }
    
    let target = message.mentions.members.first();
    
    if(!target) {
      
      let embed = new MessageEmbed()
    .setTitle(" Please mention the person who you want to kick")
    .setColor("RANDOM")
      return message.channel.send(embed)
    }
    
    if(target.id === message.author.id) {
      
      let embed = new MessageEmbed()
    .setTitle("You can not kick yourself")
    .setColor("RANDOM")
     return message.channel.send(embed)
    }
    
  if(!args[2]) {
    
      let embed = new MessageEmbed()
    .setTitle("Please Give Reason to kick")
    .setColor("RANDOM")
    return message.channel.send(embed)
  }
    
    let embed = new MessageEmbed()
    .setTitle("Action: Kick")
    .setDescription(`Kicked ${target} (${target.id})`)
    .setColor("#ff2050")
    .setFooter(`Kicked by ${message.author.username}`);
    
    message.channel.send(embed)
    
    target.kick(args[2]);
      }
  }