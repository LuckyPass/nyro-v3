const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");

module.exports = class whois extends Command {
  constructor(client) {
    super(client, {
      name: "whois",
      memberName: "whois",
      group: "info",
      description: "Get info about a user",
      guarded: true,
      format: "(User)",
      guildOnly: true
    });
  }
  async run(message) {
const client = message.client
    const args = message.content
  .slice(message.guild.commandPrefix.length)
  .split(" ");

var user =
        message.client.users.resolve(args[1]) || message.mentions.users.first();
      var member = message.guild.member(user);
      const embed = new MessageEmbed();

      if (member) {
        
        
        embed
          .setTitle("User Info")
          .setThumbnail(user.displayAvatarURL())
          .addField("Tag", user.tag)
          .addField("User ID", user.id)
          .addField("Created At", `${user.createdAt}`)
          .addField("Joined At", `${member.joinedAt}`)
          .addField(
            "Roles List",
            member.roles.cache
              .map(r => r)
              .join(", ")
          )
          .setColor("RANDOM");
        message.channel.send(embed);
      } else if (user) {
        
        
        embed
          .setTitle("User Info")
          .setThumbnail(user.displayAvatarURL())
          .addField("Tag", user.tag)
          .addField("ID", user.id)
          .addField("Created At", user.createdAt)
          .setColor("RANDOM")
        message.channel.send(embed);
      } else {
        
        
        embed
          .setTitle("User Info")
          .setThumbnail(message.author.displayAvatarURL())
          .addField("Tag", message.author.tag)
          .addField("User ID", message.author.id)
          .addField("Created At", `${message.author.createdAt}`)
          .addField("Joined At", `${message.member.joinedAt}`)
          .addField(
            "Roles List",
            message.member.roles.cache
              .map(r => r)
              .join(", ")
          )
          .setColor("RANDOM")
          
        message.channel.send(embed);
      }
  }
}