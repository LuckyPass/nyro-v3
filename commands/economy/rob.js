const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")
var mongoose = require("mongoose");

var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const ms = require("parse-ms");

module.exports = class stealCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "steal",
        group: "economy",
        aliases: ['rob'],
        memberName: "steal",
        description: "Steal from another user.",
        guildOnly: true,
      });
    }
   
    async run(message) {
let user = message.mentions.members.first()

if (!user) {
  const victimNeeded = new MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`You need to supply a victim to rob from.`);
  message.reply(victimNeeded);
} 
  else if (user.id === message.author.id) {
  const cannotRobYourselfEmbed = new MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`You cannot rob yourself.`);
  message.reply(cannotRobYourselfEmbed);
} else {

let timeout = 1000;

economy.findOne({ Guild: message.guild.id, User: message.author.id },async(err, data)=>{

if (data.RobTime !== null && timeout - (Date.now() - data.RobTime) > 0) {
    let time = ms(timeout - (Date.now() - data.RobTime));

    let timeEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`You have already robbed someone\n\nTry again in ${time.minutes}m ${time.seconds}s.`);
    message.reply(timeEmbed)
  } else if(user === message.author.id) {
      const cannotRobYourselfEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`You cannot rob yourself.`);
    message.reply(cannotRobYourselfEmbed);
  } else {

if (data.Money < 200) {
  let moneyEmbed = new MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`You need atleast $200 in your pocket before you can rob them.`)
  return message.reply(moneyEmbed)


} 
economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data1)=>{
if (data1.Money === 0 || !data1) {

  let moneyEmbed = new MessageEmbed()
  .setColor("#FF0000")
  .setDescription(`${user} needs atleast $200 in their pocket before you can rob them.`);
  return message.reply(moneyEmbed)
} else {

let stealingOdds = Math.floor(Math.random() * 100) + 1

    if (stealingOdds <= 50) { // fail section
      let punish = 500;

      

      data1.Money = data1.Money + punish;
      data.Bank = data.Bank - punish;
      data.RobTime = Date.now();
      data1.save();
      data.save();

      const failembed = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You were caught! You paid the person you stole from **$${Math.round(punish)}**. This amount has been deducted from your bank account`);
      message.reply(failembed)
      console.log(stealingOdds)

    } else if (stealingOdds > 50 && stealingOdds <= 80) { // 30% payout

      data.Money = data.Money + Math.round(data1.Money * 0.3);
      data1.Money = data1.Money - Math.round(data1.Money * 0.3);
      data.RobTime = Date.now();
      data1.save();
      data.save();
      console.log(stealingOdds)

      const thirtyembed = new MessageEmbed()
      .setColor("#00FF00")
      .setDescription(`You managed to steal a small amount before leaving! 💸\nYour payout was **$${Math.round(data1.Money * 0.3).toLocaleString()}**.`);
      message.reply(thirtyembed)

    } else if (stealingOdds > 80 && stealingOdds <= 90) { // 50% payout

      
      data.Money = data.Money + Math.round(data1.Money * 0.5);
      data1.Money = data1.Money - Math.round(data1.Money * 0.5);
      data.RobTime = Date.now();
      data1.save();
      data.save();

      const fiftyembed = new MessageEmbed()
      .setColor("#00FF00")
      .setDescription(`You managed to steal a large amount before leaving! 💰\nYour payout was **$${Math.round(data1.Money * 0.5).toLocaleString()}**.`);
      message.reply(fiftyembed)
      console.log(stealingOdds)


    } else { // full theft up to 1 trillion

      const fullembed = new MessageEmbed()
      .setColor("#00FF00")

      data.Money = data.Money + data1.Money;
      fullembed.setDescription(`You managed to steal the persions whole sum of money before leaving! 🤑\nYour payout was **$${data1.Money.toLocaleString()}**.`);
      message.reply(fullembed)
      data1.Money = data1.Money - data1.Money;
      data.RobTime = Date.now();
      data1.save();
      data.save();

      console.log(stealingOdds)
    
    }
   }
  })
}
});
  }
  

}
}
