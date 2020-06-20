const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class suggest extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      memberName: "suggest",
      group: "miscellaneous",
      description: "Suggest something",
      format: "(suggestion)",
    });
  }
  async run(message) {
      const client = message.client;
     const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");

     if(args[1]){ 
      let embed = new MessageEmbed()
      .setTitle("Suggestion!")
      .setColor("GREEN")
      .setDescription(`Suggested by: ${message.author.tag}(${message.author.id})\nSuggestion: ${args.slice(1).join(" ")}`)
      client.channels.cache.get("717440075448975390").send(embed).then(() =>{
        let em = new MessageEmbed()
      .setTitle("Sent!")
        .setColor("GREEN")
        .setDescription('Suggestion sent!')
        .setFooter("Nik's Utilities Development", client.user.displayAvatarURL())
        message.channel.send(em)
      })
    }
  else{
      let embed = new MessageEmbed()
      .setTitle("REEEEEEEEEEEE")
      .setColor("RED")
      .setDescription("You have to suggest something")
      message.channel.send(embed);
    }
  }
}