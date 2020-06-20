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
        name: "addmoney",
        group: "economy",
        memberName: "addmoney",
        description: "Add money to a member",
        guildOnly: true,
        ownerOnly: true,
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

    if (isNaN(args[2])) {message.reply('you need to set an amount to add / define a user')} else {
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
              .setDescription(`:white_check_mark: I've successfully gave ${user.tag} ${amount}.`);
              message.channel.send(embed1)

           } else {
              data.Money = data.Money + amount;
              data.save().catch(err => console.log(err))
              let embed2 = new MessageEmbed()
              .setColor("#00FF00")
              .setDescription(`:white_check_mark: I've successfully gave ${user.tag} ${amount}.`);
              message.channel.send(embed2)
          }
      })
    };

  }
    }
}