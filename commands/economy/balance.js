const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
var mongoose = require("mongoose");

//                                                                  ↓ collection name optional
var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class balanceCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "balance",
        group: "economy",
        aliases: ['bal'],
        memberName: "balance",
        description: "Return a users balance",
        guildOnly: true
      });
    }
   
    async run(message) {
        economy.findOne({ Guild: message.guild.id, User: message.author.id }, async(err, data) => {
            if(err) {
            message.reply(`Error: ${err}`) 
            }
            if (!data) {
              let Embed = new MessageEmbed()
              .setTitle(`**${message.author.tag}'s Balance**\n\n`)
              .setDescription(`**Cash:** $0\n**Bank:** $0`)
              message.channel.send(Embed)
            } else if (data) {
            let Embed = new MessageEmbed()
            .setTitle(`**${message.author.tag}'s Balance**\n\n`)
            .setDescription(`**Cash:** $${data.Money}\n**Bank:** $${data.Bank}`)
            message.channel.send(Embed)
            }
        })


    }
}