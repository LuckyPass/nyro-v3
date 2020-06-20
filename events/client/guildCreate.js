let {MessageEmbed} = require("discord.js");

module.exports = (guild) => {
const client = guild.client;
  
let embed = new MessageEmbed()
  .setTitle("Guild Joined!")
  .setColor("RANDOM")
  .addField("Guild Name",`${guild.name} | [${guild.id}]`, true)
  .addField("Owner", `${guild.owner.user.tag} | [${guild.owner.id}]`, true)
  .addField("Member Count", `${guild.memberCount}`, true)
  .addField("Bot Guilds", client.guilds.cache.size, true)
  client.channels.cache.get("722177341115334696").send(embed)
}
