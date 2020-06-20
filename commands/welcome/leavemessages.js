const {Command} = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
module.exports = class leavemessage extends Command {
  constructor(client) {
    super(client, {
      name: "leavemessage",
      memberName: "leavemessage",
      group: "welcome",
      description: "Enable or disable leave announcement",
      guarded: true,
      guildOnly: true,
      userPermissions: ["MANAGE_CHANNELS"],
      format: "(on/off)"
    });
  }
  async run(message) {
      const client = message.client;
      const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
    
if (message.member.hasPermission("MANAGE_CHANNELS")) {
 const Iw = require("../../models/imageWelcome.js");

    if (args[1] == "on" || args[1] == "off") {
                  let val;
            if(args[1].toLowerCase() == "off") val = false
            else if(args[1].toLowerCase() == "on") val = true;

      Iw.findOne({ ServerID: message.guild.id }, async (err, imageWelcome) => {
          if (imageWelcome) {
            imageWelcome.LeaveMsg = val;
            imageWelcome.updated = true;
             await imageWelcome.save();
            const embed = new MessageEmbed()
              .setTitle(`Leave Message turned ${val}`)
              .setColor("BLUE")
            return message.channel.send(embed);
                }else {
                  let embed3 = new MessageEmbed()
                  .setTitle("No Set Welcome Image Channel Found!")
                  .setColor("BLUE")
                  .setDescription("You need to set up a welcome channel")
                  
                }
              })
      } else {
        const embed = new MessageEmbed()
          .setTitle("Err")
          .setColor("BLUE")
          .setDescription("Please provide me if you want the leave message to be \`on\` or \`off\`")
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
  }
}