const {MessageEmbed} = require("discord.js");
const logs = require("../../models/logs.js");
const {stripIndents} = require("common-tags");

module.exports = (oldMessage, newMessage) => {
    if(oldMessage.channel.type === "dm") return;
  logs.findOne({ServerID: oldMessage.guild.id}, async (err, log) => {
  if(!log) return;  
  if(oldMessage.author.bot) return;
    
  let embed = new MessageEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .addField("Message Edited", stripIndents`**Old Message:**
            **Author:** ${oldMessage.author.tag}
            **Channel:** <#${oldMessage.channel.id}>
            [Jump To Message](${newMessage.url})
            **Old Message Content:** 
            \`${oldMessage.content}\`
            
            **Edited Message Content:** 
            \`${newMessage.content}\``)
  
  oldMessage.guild.channels.cache.get(log.ID).send(embed);
  })
};