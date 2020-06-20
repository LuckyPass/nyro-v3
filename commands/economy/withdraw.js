

const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")

var mongoose = require("mongoose");
//                                                                  ↓ collection name optional
var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class withdrawCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "withdraw",
        group: "economy",
        aliases: ['with'],
        memberName: "withdraw",
        description: "Withdraw x$.",
        guildOnly: true,
      });
    }
   
    async run(message) {   
  let user = message.author;

  const args = message.content
  .slice(message.guild.commandPrefix.length)
  .split(" ");

  let amount = Math.round(args[1])
  economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{
    if(err) console.log(err)

    if (!data) {
      let newEconomy = new economy({
        User: user.id,
        Guild: message.guild.id,
        Money: 0,
        Bank: 0,
        Tag: message.author.tag
    })
  
    newEconomy.save();

    } else {

    if(isNaN(amount) && args[1] !== "all") {
        let errorembed = new MessageEmbed()
        .setColor('#FF0000')
        .setDescription(":negative_squared_cross_mark: You didn't supply a valid number, or it wasnt \"all\".")
        message.reply(errorembed);
    } 

    else if (!args[1]){

      let embed2 = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`:negative_squared_cross_mark: Specify an amount to withdraw`);
      message.reply(embed2)

      } else if (data.Money < 0 && args[1] === "all" || data.Money < 0 && args[1] !== "all") {

        let embed2 = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`:negative_squared_cross_mark: You cannot withdraw negative money!`);
        message.reply(embed2)

      } else if (data.Bank < amount) {

      let notEnoughMoney = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`:negative_squared_cross_mark: You do not have enough money in your bank to withdraw that amount!`)
      message.reply(notEnoughMoney)
    }

    else if (data.Bank && args[1] !== "all") {

    data.Money = data.Money + amount;
    data.Bank = data.Bank - amount;
    data.Tag = message.author.tag;
    data.save();
    let embed5 = new MessageEmbed()
  .setColor("#00FF00")
  .setDescription(`:white_check_mark: You have withdrawed $${amount} into your wallet.`);
  message.channel.send(embed5)

    }

  if (data.Bank && args[1] === "all") {

    amount = data.Bank;
    let embed5 = new MessageEmbed()
    data.Money = data.Money + data.Bank;
    data.Bank = data.Bank - data.Bank;
    data.Tag = message.author.tag;
    embed5.setDescription(`:white_check_mark: You have withdrawed $${amount} into your wallet.`);
    data.save();
    embed5.setColor("#00FF00")
    message.channel.send(embed5)
  
  }
  }
  });
}
}

