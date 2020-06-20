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
module.exports = class addmoneyCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "removemoney",
        group: "economy",
        memberName: "removemoney",
        description: "Remove money from a user",
        guildOnly: true,
        ownerOnly: true
      });
    }
    async run(message) {
        
    let user = message.mentions.members.first() || message.author;
    if (!user) {
     message.reply('you need to define a user to give money to!');
    } else {
    const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");

    if (isNaN(args[2])) {
      let incorrectFormat = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`Incorrect format. Use \`${message.guild.commandPrefix}${message.guild.name}removemoney user amount\``)
      message.reply(incorrectFormat)
    } else {
    let amount = args[2];
        economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{
          if(err) console.log(err)

          if(!data){
              let newEconomy = new economy({
                  User: user.id,
                  Guild: message.guild.id,
                  Money: amount,
                  Bank: 0
              })
              newEconomy.save(); 
          let embed1 = new MessageEmbed()
              .setColor("#00FF00")
              .setDescription(`:white_check_mark: I've successfully reduced ${user}'s money by ${amount}.`);
              message.channel.send(embed1)

           } else {
              data.Money = data.Money - amount;
              data.save().catch(err => console.log(err))
              let embed2 = new MessageEmbed()
              .setColor("#00FF00")
              .setDescription(`:white_check_mark: I've successfully ${user}'s money by ${amount}.`);
              message.channel.send(embed2)
          }
      })
    };
  }
    }
}