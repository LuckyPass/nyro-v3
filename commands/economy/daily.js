

const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");

var mongoose = require("mongoose");
//                                                                  ↓ collection name optional
var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class dailyCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "daily",
        group: "economy",
        aliases: ['day'],
        memberName: "daily",
        description: "Acquire your daily cheque.",
        guildOnly: true
      });
    }
   
    async run( message) {
  let user = message.author;

  let timeout = 86400000;
  let amount = 200;

  economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{
    if(err) message.reply(err)
    if (!data) {
      let newEconomy = new economy({
        User: user.id,
        Guild: message.guild.id,
        Money: amount,
        Bank: 0,
        Tag: message.author.tag,
        DailyTime: Date.now()
    })
    
    newEconomy.save();
    let moneyEmbed = new MessageEmbed()
    .setColor("#00FF00")
    .setDescription(`You've collected your daily reward of $${amount}.`);
    message.channel.send(moneyEmbed)
  } else {
    if (data.DailyTime !== null && timeout - (Date.now() - data.DailyTime) > 0) {
      let time = ms(timeout - (Date.now() - data.DailyTime));
    
      let timeEmbed = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {

      data.Money = data.Money + amount;
      data.DailyTime = Date.now();
      data.save()
      let moneyEmbed = new MessageEmbed()
      .setColor("#00FF00")
      .setDescription(`You've collected your daily reward of $${amount}.`);
      message.channel.send(moneyEmbed)
  }
}
  });

}
};

