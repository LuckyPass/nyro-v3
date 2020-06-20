const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class setwelcomechannel extends Command {
  constructor(client) {
    super(client, {
      name: "setwelcomechannel",
      memberName: "setwelcomechannel",
      group: "welcome",
      description: "Set a welcome channel in your server.",
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
      guarded: true,
      guildOnly: true,
      format: "(channel)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
const Iw = require("../../models/imageWelcome.js");

if (message.member.hasPermission("MANAGE_CHANNELS", {
  checkAdmin: true,
  checkOwner: true
})) {
 
    if (args[1]) {
      var role;
      if (message.mentions.channels) {
        role = message.mentions.channels.first();
      } else {
        role = message.guild.channels.cache.get(args.slice(1).join(" "));
      }
      if (role != undefined) {
        Iw.findOne({ ServerID: message.guild.id }, async (err, imageWelcome) => {
          if (!imageWelcome) {
            const newimageWelcome = new Iw({
              ServerID: message.guild.id,
              ServerName: message.guild.name,
              IChannelName: role.name,
              IChannelID: role.id,
              LeaveMsg: true
            });
            newimageWelcome.save();
            const embed = new MessageEmbed()
              .setTitle("Welcome Channel Set!")
              .setColor("RANDOM")
              .setDescription("The welcome channel for this server has been set")
              .addField("Channel", `${role}`)
              .addField("Channel Name", role.name)
              .addField("ID", role.id)
              .setTimestamp();
            return message.channel.send(embed);
          } else {
            let same = new MessageEmbed()
            .setTitle("Cancelled!")
            .setColor("BLACK")
            .setDescription(":x: That channel has already been set!.")
            if(imageWelcome.IChannelID === role.id) return message.channel.send(same)
            const embedd = new MessageEmbed()
              .setTitle("Another Channel Found")
              .setColor("RANDOM")
              .setDescription("A set channel has been found in this server")
              .addField(
                "Channel",
                `${message.guild.channels.cache.get(imageWelcome.IChannelID)}`
              )
            .addField("Channel Name", 
                  imageWelcome.IChannelName)
            .addField("ID", imageWelcome.IChannelID)
              .addField(
                "Do you want to update the channel?",
                `New channel: ${role} ${role.name}. **Type \`yes\` if you want to update the channel**`
              )
              .setTimestamp();
            message.channel.send(embedd).then((embedd)=>{
            message.channel
              .awaitMessages(m => m.content.toLowerCase() == "yes", {
                time: 30000,
                max: 1,
                errors: ["time"]
              })
              .then(async collected => {
                if (collected.first().content == "yes") {
                  imageWelcome.IChannelName = role.name;
                  imageWelcome.IChannelID = role.id;
                  imageWelcome.updated = true;
                  await imageWelcome.save();
                  const embeEd = new MessageEmbed()
                    .setTitle("Updated!")
                    .setColor("RANDOM")
                    .setDescription("Channel Updated!")
                    .addField("Channel", `${role}`)
                    .addField("ID", role.id)
                  .addField("Name", role.name)

                    .setTimestamp();
                 message.channel.send(embeEd);
                }
              })
              .catch(err => {
                const embed = new MessageEmbed()
                  .setTitle("Command Cancelled")
                  .setColor("RANDOM")
                  .setDescription(":exclamation: Command has been cancelled")
                  .setTimestamp();
                return embedd.edit(embed);
              });
              })
          }
        });
      } else {
        const embed = new MessageEmbed()
          .setTitle("Err")
          .setColor("RANDOM")
          .setDescription(":x: That channel could not be found in this server")
          .setTimestamp();
        return message.channel.send(embed);
      }
    } else {
      const embed = new MessageEmbed()
        .setTitle("Not enough arguments")
        .setColor("RANDOM")
        .setDescription(
          ":x: You need to provide a channel to set as the welcome channel."
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
   }else{
      const embed = new MessageEmbed()
        .setTitle("Not enough permissions")
        .setColor("RANDOM")
        .setDescription(
          ":x: You need the `MANAGE_CHANNELS` permission!."
        )
        .setTimestamp();
      return message.channel.send(embed);
     
   } 
    }
  }