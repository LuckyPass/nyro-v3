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


module.exports = class depositCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "deposit",
        group: "economy",
        aliases: ['dep'],
        memberName: "despoit",
        description: "Deposit x$.",
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
        .setDescription("You didn't supply a valid number, or it wasnt \"all\".")
        message.reply(errorembed);
    } 

    else if (!args[1]){

      let embed2 = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`Specify an amount to deposit`);
      message.reply(embed2)

      } else if (data.Money < 0 && args[1] === "all" || data.Money < 0 && args[1] !== "all") {

        let embed2 = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`You cannot deposit negative money!`);
        message.reply(embed2)

      } else if (data.Money < amount) {

      let notEnoughMoney = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(` You do not have enough money in your pocket to deposit that amount!`)
      message.reply(notEnoughMoney)
    } else if (data.Money === 0) {
      let notEnoughMoney = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You have $0 in your wallet!`)
      message.reply(notEnoughMoney)
    }

    if (data.Money && args[1] !== "all") {

    data.Money = data.Money - amount;
    data.Bank = data.Bank + amount;
    data.Tag = message.author.tag;
    data.save();
    let embed5 = new MessageEmbed()
  .setColor("#00FF00")
  .setDescription(`You have deposited $${amount} into your bank`);
  message.channel.send(embed5)

    }

  if (data.Money && args[1] === "all") {

    amount = data.Money;
    let embed5 = new MessageEmbed()
    data.Money = data.Money - data.Money;
    data.Tag = message.author.tag;
    embed5.setDescription(`You have deposited $${amount} into your bank`);
    data.Bank = data.Bank + amount;
    data.save();
  embed5.setColor("#00FF00")
  message.channel.send(embed5)

  }
  }
  });
}
}