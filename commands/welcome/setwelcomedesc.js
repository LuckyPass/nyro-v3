const {Command} = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class setwelcomedesc extends Command {
  constructor(client) {
    super(client, {
      name: "setwelcomedesc",
      memberName: "setwelcomedesc",
      group: "welcome",
      description: "Set a custom message for the welcome. (Patreon only)",
      guarded: true,
      guildOnly: true,
      userPermissions: ["MANAGE_CHANNELS"],
      format: "(message)"
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
if (message.member.hasPermission("MANAGE_CHANNELS")) {
const Iw = require("../../models/imageWelcome.js");
 
    if (args[1]) {
        Iw.findOne({ ServerID: message.guild.id }, async (err, imageWelcome) => {
          if (imageWelcome) {
            imageWelcome.Description = args.slice(1).join(" ")
            imageWelcome.updated = true;
             await imageWelcome.save();
            
            const embed = new MessageEmbed()
              .setTitle("Welcome Message Set!")
              .setColor("BLUE")
              .addField("Message", args.slice(1).join(' '))
              .setTimestamp();
            return message.channel.send(embed);
                }else {
                  let embed3 = new MessageEmbed()
                  .setTitle("No Set Welcome Image Channel Found!")
                  .setColor("BLUE")
                  .setDescription("You need to setup a welcome channel")
                  
                }
              })
      } else {
        const embed = new MessageEmbed()
          .setTitle("Err")
          .setColor("BLUE")
          .setDescription(":x: Please provide me with a message for the description!")
          .setTimestamp();
        return message.channel.send(embed);
      }
   }else{
      const embed = new MessageEmbed()
        .setTitle("Not enough permissions")
        .setColor("BLUE")
        .setDescription(
          ":x: You need the `MANAGE_CHANNELS` permission!."
        )
        .setTimestamp();
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