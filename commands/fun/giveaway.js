const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const version = require("../../package.json").version;

module.exports = class giveaway extends Command {
  constructor(client) {
    super(client, {
      name: "giveaway",
      memberName: "giveaway",
      group: "fun",
      description: "Make a new giveaway.",
      guarded: true,
      guildOnly: true,
      format: "(time) (channel) (prize)"
    });
  }
  async run(message) {
      const client = message.client;
      const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");

        if(!message.member.hasPermission("MANAGE_CHANNELS")) {
          
        let embeds = new MessageEmbed()
        .setColor("FF00FF")
        .setDescription(`You dont have \"MANAGE_CHANNELS\" permission`)
          message.reply(embeds)        
        }
        if(!args[1]) {
          
        let embeds = new MessageEmbed()
        .setColor("FF00FF")
        .setDescription(`You did not specify your time!`)
          message.channel.send(embeds)
          }
        if(!args[1].endsWith("d")&&!args[1].endsWith("h")&&!args[1].endsWith("m")){
         
        let embeds = new MessageEmbed()
        .setColor("FF00FF")
        .setDescription(`You did not use the correct formatting for the time!`)
          message.channel.send(embeds)
          }
        if(isNaN(args[1][1])){
          
        let embeds = new MessageEmbed()
        .setColor("FF00FF")
        .setDescription(`That is not a number!`)
          return message.channel.send(embeds)
          }
        let channel = message.mentions.channels.first()
        if(!channel) {
          
        let embeds = new MessageEmbed()
        .setColor("FF00FF")
        .setDescription(`I could not find that channel in the guild!`)
          message.channel.send(embeds)
          }
        let prize = args.slice(3).join(" ")
        if(!prize) {
          
        let embeds = new MessageEmbed()
        .setColor("FF00FF")
        .setDescription(`No prize specified!`)
          message.channel.send(embeds)
          }
        message.channel.send(`*Giveaway created in ${channel}*`)
        let Embed = new MessageEmbed()
        .setTitle(`New giveaway!`)
        .setDescription(`The user ${message.author} is hosting a giveaway for the prize of **${prize}**`)
        .setTimestamp(Date.now()+ms(args[1]))
        .setColor(`BLUE`)
        let m = await channel.send(Embed)
        m.react("🎉")
        setTimeout(() => {
            if(m.reactions.cache.get("🎉").count<=1){
                message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`)
                return message.channel.send(`Not enough people reacted for me to start draw a winner!`)
            }
            
            let winner = m.reactions.cache.get("🎉").users.cache.filter(u=>!u.bot).random()
            channel.send(`The winner of the giveaway for **${prize}** is... ${winner}`)
        }, ms(args[1]));
    }          
  }