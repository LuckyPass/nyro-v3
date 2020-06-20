

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

module.exports = class workCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "work",
        group: "economy",
        memberName: "work",
        description: "Work and recieve money.",
        guildOnly: true
      });
    }
    async run(message) {    

    let user = message.author;
    let timeout = 3600000;

    let replies = 
    ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic', 'Hooker', 'Stripper', 'ATC', 'Pilot', 'Firefighter',
    'Police Officer', 'Airport Manager', 'Store Clerk', 'First-Line Supervisors of Animal Husbandry and Animal Care Worker Career'];

    economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{
      if(err) message.reply(err)

      let result = Math.floor((Math.random() * replies.length));
      let amount = Math.floor(Math.random() * 80) + 1;
      if(!data){
        let newEconomy = new economy({
            User: user.id,
            Guild: message.guild.id,
            Money: amount,
            Bank: 0,
            Tag: message.author.tag,
            WorkTime: Date.now()
        })
        newEconomy.save(); 
        let embed1 = new MessageEmbed()
        .setColor("#00FF00")
        .setDescription(`You worked as a ${replies[result]} and earned $${amount}.`);
        message.channel.send(embed1)
      } else {
      if (data.WorkTime !== null && timeout - (Date.now() - data.WorkTime) > 0) {
        let time = ms(timeout - (Date.now() - data.WorkTime));
    
        let timeEmbed = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription(`You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
      } else {


              data.Money = data.Money + amount;
              data.WorkTime = Date.now();
              data.save().catch(err => console.log(err))
              let embed2 = new MessageEmbed()
              .setColor("#00FF00")
              .setDescription(`You worked as a ${replies[result]} and earned $${amount}.`);
              message.channel.send(embed2)
          }
    };
  })
}
}

