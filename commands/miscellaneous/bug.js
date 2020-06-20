const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class bug extends Command {
  constructor(client) {
    super(client, {
      name: "bug",
      memberName: "bug",
      group: "miscellaneous",
      description: "Report a bug",
      format: "(your report)",
    });
  }
  async run(message) {
      const client = message.client;
     const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");

     if(args[1]){ 
      let embed = new MessageEmbed()
      .setTitle("Bug Report")
      .setColor("RED")
      .setDescription(`Reported by: ${message.author.tag}(${message.author.id})\nMessage: ${args.slice(1).join(" ")}\nIn: ${message.guild.name}`)
      client.channels.cache.get("717081736604811334").send(embed).then(() =>{
        let em = new MessageEmbed()
      .setTitle("Sent!")
        .setColor("GREEN")
        .setDescription('Report sent!')
        .setFooter("Nik's Utilities Development", client.user.displayAvatarURL())
        message.channel.send(em)
      })
    }
  else{
      let embed = new MessageEmbed()
      .setTitle("REEEEEEEEEEEEEEEEEEEEEEE")
      .setColor("RED")
      .setDescription("You have to report something")
      message.channel.send(embed);
    }
  }
}