const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")
const ms = require("parse-ms");
var mongoose = require("mongoose");
//                                                                  ↓ collection name optional
var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class weeklyCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "weekly",
        group: "economy",
        memberName: "weekly",
        description: "Earn your weekly paycheck.",
        guildOnly: true,
      });
    }
   
    async run(message) {   

  let user = message.author;
  let timeout = 604800000;
  let amount = 1000;

  economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{
    if(err) message.reply(err)

    if (!data) {
      let newEconomy = new economy({
        User: user.id,
        Guild: message.guild.id,
        Money: amount,
        Bank: 0,
        Tag: message.author.tag,
        WeeklyTime: Date.now()
    })
    newEconomy.save();
    let okGoodEmbed = new MessageEmbed()
    .setColor("#00FF00")
    .setDescription(`You've successfully collected your weekly pay reward of $${amount}.`)
    message.reply(okGoodEmbed)
  }

  if (data.WeeklyTime !== null && timeout - (Date.now() - data.WeeklyTime) > 0) {
    let time = ms(timeout - (Date.now() - data.WeeklyTime));
  
    let timeEmbed = new MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`You have already collected your weekly reward\n\nCollect it again in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
   
      data.Money = data.Money + amount;
      data.WeeklyTime = Date.now();
      data.save()

      let okGoodEmbed = new MessageEmbed()
      .setColor("#00F00")
      .setDescription(`You've successfully collected your weekly pay cheque of $${amount}.`)
      message.reply(okGoodEmbed)
  }
  });
}
}
  
  