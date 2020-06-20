const {MessageEmbed} = require("discord.js");
const logs = require("../../models/logs.js");
const {stripIndents} = require("common-tags");

module.exports = (channel) => {
  if(channel.type === "dm") return;
  logs.findOne({ServerID: channel.guild.id}, async (err, log) => {
    if(!log) return;
    
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .addField("Channel Created",stripIndents 
              `**Channel Name:** ${channel.name} [${channel.id}]
              **Created At:** ${channel.createdAt}`)
  channel.guild.channels.cache.get(log.ID).send(embed);
  })
  };