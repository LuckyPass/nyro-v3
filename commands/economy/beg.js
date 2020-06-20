const commando = require("discord.js-commando");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js")

var mongoose = require("mongoose");

var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class begCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "beg",
        group: "economy",
        aliases: ['b'],
        memberName: "beg",
        description: "Beg for money.",
        guildOnly: true,
      });
    }
   
    async run(message) {
    
    let user = message.author;
    const chances = Math.floor(Math.random() * 100)
    let timeout = 120000;
    
    economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{
      if(err) message.reply(err)
      if (data.BegTime !== null && timeout - (Date.now() - data.BegTime) > 0) {
        let time = ms(timeout - (Date.now() - data.BegTime));
      
        let timeEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription(` You've already begged\n\nYou can beg again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {

      if (!data) {
        let newEconomy = new economy({
          User: user.id,
          Guild: message.guild.id,
          Money: 0,
          Bank: 0,
          Tag: message.author.tag
        })
      
      newEconomy.save();
      }
      if (chances <= 50) {
      message.reply('*is sitting on the streets because no one gave them any money.*')
      message.channel.send(`*everyone walking by* hahahah ur poor go get a life`)
    } else if (chances > 50) {
      let amount = Math.floor(Math.random() * 150)
      message.reply(`lucky for you, someone who was kind enough, decided to give you $${amount}.`);
      data.Money = data.Money + amount;
      data.BegTime = Date.now();
      data.save()
    
  }
  }
});
    }
}