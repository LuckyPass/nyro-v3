const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class slowmode extends Command {
  constructor(client) {
    super(client, {
      name: "slowmode",
      memberName: "slowmode",
      group: "utility",
      description: "Set slowmode on the current channel",
      guarded: true,
      guildOnly: true,
      format: "(seconds)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
      if(!args[1]){
        
         let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   `You did not specify the time in seconds you wish to set this channel's slow mode too!`
            );
        message.channel.send(embed)
        }
        if(isNaN(args[1])){
          
         let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   `That is not a number!`
            );
          message.channel.send(embed)
        }
          if(!message.member.hasPermission("MANAGE_MESSAGES")){
          let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   `You do not have the MANAGE_MESSAGES permission!`
            );
            message.channel.send(embed)
        }
            let reason = args.slice(2).join(' ')
        if(!reason){
            reason=="No reason provided!"
        }
        message.channel.setRateLimitPerUser(args[1],reason)
    
          let embezd = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
   `Set the slowmode of this channel to **${args[0]}** with the reason: **${reason}**`
            );
        message.channel.send(embezd)
  }
  }