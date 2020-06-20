const {Command} = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class setimage extends Command {
  constructor(client) {
    super(client, {
      name: "setimage",
      memberName: "setimage",
      group: "welcome",
      description: "Set a custom image for the welcome image. (Patreon only) (Max res 1024/450)",
      guarded: true,
      guildOnly: true,
      format: "(image link)",
      userPermissions: ["MANAGE_CHANNELS"]
    });
  }
  async run(message) {
      const client = message.client;
      const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
let role = "715290028892225556";
    
    // Get server with ID
    let support = client.guilds.cache
      .get("712936857297616928")
      .members.cache.get(message.author.id)
    
    // If the person is in the support server then it will execute this
    if (support) {
      
     // The client checks if the person has the supporter role in the server, then it will execute rest of the code
      if(client.guilds.cache.get("712936857297616928").members.cache.get(message.author.id).roles.cache.has(role)){

const img = require("../../models/imageWelcome.js");
const Iw = require("../../models/thumbnail.js");
      
      if (args[1]) {
        img.findOne(
          { ServerID: message.guild.id },
          async (err, imageWelcome) => {
            if (imageWelcome) {
              Iw.findOne(
                { ServerID: message.guild.id },
                async (err, Thumbnail) => {
                  if (!Thumbnail) {
                    let newThumb = new Iw({
                      ServerID: message.guild.id,
                      ServerName: message.guild.id,
                      Thumbnail: args.slice(1).join(" ")
                    });
                    await newThumb.save();

                    const embed = new MessageEmbed()
                      .setTitle("Welcome Message Thumbnail Set!")
                      .setColor("#ff00ff")
                      .setTimestamp();
                    return message.channel.send(embed);
                  } else {
                    Thumbnail.Thumbnail = args.slice(1).join(" ");
                    Thumbnail.updated = true;
                    await Thumbnail.save();

                    const embed = new MessageEmbed()
                      .setTitle("Welcome Message Thumbnail Set!")
                      .setColor("#ff00ff")
                      .setTimestamp();
                    return message.channel.send(embed);
                  }
                }
              );
            } else {
              let embed3 = new MessageEmbed()
                .setTitle("No Set Welcome Image Channel Found!")
                .setColor("BLUE")
                .setDescription(
                  "You need to set up a welcome channel`"
                );
            }
          }
        );
      } else {
        const embed = new MessageEmbed()
          .setColor("BLUE")
          .setDescription(
            "Please provide me with a image link for the thumbnail! It must be 1024/450 resolution"
          )
        return message.channel.send(embed);
      }
      
}else {
        let embed = new MessageEmbed()
          .setDescription(
            "This command is patreon-only. You dont have the Epic Supporter role in the support server."
          )
          .setColor("RED");
        message.channel.send(embed);
  }
  
    // else if the person is not in the server, the bot will send this to the user
    } else {
        let embed = new MessageEmbed()
          .setDescription(
            "This command is patreon-only. You have to be in the support server. Please run n!support for the link."
          )
          .setColor("RED");
        message.channel.send(embed);
    }
  }
}