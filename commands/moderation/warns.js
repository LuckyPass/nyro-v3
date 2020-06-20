const commando = require("discord.js-commando");
const numeral = require("numeral");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
var mongoose = require("mongoose");
const parseMilliseconds = require('parse-ms');

//                                                                  ↓ collection name optional
var url = "";
let warns = require("../../models/warns.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
 
module.exports = class warnsCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "warns",
      group: "moderation",
      memberName: "warns",
      description: "View a users' warns",
      guildOnly: true,
      userPermissions: ["MANAGE_MESSAGES"]
    });
  }
 
  async run(message) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      
           let embed = new MessageEmbed()
            .setColor("BLUE")
            .setDescription(
              `You do not have enough permissions to use this command`
            );
      return message.reply(embed)
    }

let embed1 = new MessageEmbed()
.setTitle("No Warnings")
.setDescription("There is no warnings for the specified user.")
.setColor("RANDOM")
.setTimestamp()
let user = message.mentions.members.first();
        if(!user) return message.channel.send(`User?`)
        warns.find({ Guild: message.guild.id, User: user.id },async(err, data) => {
            if(err) {
            message.reply(`Error: ${err}`) 
            }
            if(!data.length) return message.channel.send(embed1)
            let Embed = new MessageEmbed()
            .setTitle(`${user.user.tag}'s Warns - ${user.id}`)
            .setDescription(data.map(d=>{
                return d.Warns.map((w,i)=> `**Executed by:** ${message.guild.members.cache.get(w.Moderator).user.tag}\n **Reason:** ${w.Reason}\n`).join("\n") 
            }))
            message.channel.send(Embed)
        })
}
}