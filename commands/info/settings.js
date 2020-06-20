const { Client, Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const iw = require("../../models/imageWelcome.js")
const jr = require("../../models/joinRole.js");
const mutes = require("../../models/muteRole.js");

module.exports = class settings extends Command {
  constructor(client) {
    super(client, {
      name: "settings",
      memberName: "settings",
      group: "info",
      description:
        "View settings for your server.",
      guildOnly: true,
    });
  }
  async run(message) {
    var client = message.client;
    const embed = new MessageEmbed()
      .setTitle("Settings")
      .setColor("RANDOM")
      .setTimestamp()

//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\\    
   await iw.findOne({ ServerID: message.guild.id }, async (err, doc) => {
      if (err) {
        const embed1 = new MessageEmbed()
          .setTitle("Error")
          .setColor("BLUE")
          .setDescription(`An error has occurred: ${err}`)
          .setTimestamp();
        return message.reply(embed1);
      }
        if(doc){
        embed.addField("Welcome Channel", `<#${doc.IChannelID}>`)
        }else{
          embed.addField("Welcome Channel", "Not Configured.")
        }
      
    })
 
//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\\    
   await jr.findOne({ ServerID: message.guild.id }, async (err, joinRole) => {
      if (err) {
        const embed = new MessageEmbed()
          .setTitle("Error")
          .setColor("RANDOM")
          .setDescription(`An error has occurred: ${err}`)
          .setTimestamp();
        return message.reply(embed);
      }
      
      if(joinRole){
      embed.addField("Join Role", `${joinRole.JoinRoleName}`)
      }else {
      embed.addField("Join Role", "Not Configured.")
      }
    })
     
//—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————\\   
   await mutes.findOne({ ServerID: message.guild.id }, async (err, mute) => {
      if (err) {
        const embed = new MessageEmbed()
          .setTitle("Error")
          .setColor("BLUE")
          .setDescription(`An error has occurred: ${err}`)
          .setTimestamp();
        return message.reply(embed);
      }
      
      if(mute){
      embed.addField("Mute Role", `${mute.MuteRoleName}`)
      }else {
      embed.addField("Mute Role", "Not Configured.")
      }
    })
        
    setTimeout(() => {
      message.channel.send(embed);
    }, 200);
  }
};
