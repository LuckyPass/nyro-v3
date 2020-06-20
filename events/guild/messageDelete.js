const {MessageEmbed} = require("discord.js");
const logs = require("../../models/logs.js");
const {stripIndents} = require("common-tags");

module.exports = (message) => {
    if(message.channel.type === "dm") return;
  logs.findOne({ServerID: message.guild.id}, async (err, log) => {
  if(!log) return;  
  
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .addField("Message Deleted!", stripIndents`
            **Author:** ${message.author.tag}
            **Message ID:** ${message.id}
            **Contents:** \`${message.content}\`
            **Channel:** <#${message.channel.id}>
            `)
  
  message.guild.channels.cache.get(log.ID).send(embed);
  });
};