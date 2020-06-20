



const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")
var mongoose = require("mongoose");

var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = class shareCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "share",
        group: "economy",
        aliases: ['sh'],
        memberName: "share",
        description: "Give money to another user.",
        guildOnly: true,
      });
    }
   
    async run(message) {

      const client = message.client;


      function getUserFromMention(mention) {
        if (!mention) return;
      
        if (mention.startsWith('<@') && mention.endsWith('>')) {
          mention = mention.slice(2, -1);
      
          if (mention.startsWith('!')) {
            mention = mention.slice(1);
          }
      
          return client.users.cache.get(mention);
        }
      }

      economy.findOne({ Guild: message.guild.id, User: message.author.id },async(err, data)=>{
        if(err) message.reply(err)

    const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");
    console.log(args[1].length)

    // var mention = args.slice(1, -1);
    let user = getUserFromMention(args[1]);
    console.log(args.slice(1))

    if (args[1].length !== 22) {
      const incorrectFormat = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`Incorrect format. Use \`${message.guild.commandPrefix}share user amount\`\nThe amount cannot be higher than 22 numbers, or the bot will return an error code.`)
      .setTimestamp();
      message.reply(incorrectFormat)
    } 
    else if (user === message.author) {
      const noGivingToYourself = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You cannot give money to yourself.`)
      .setTimestamp();
      message.reply(noGivingToYourself)
    } else if (!args[2]) {
      const needAnAmount = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You need to set an amount!`)
      .setTimestamp();
      message.reply(needAnAmount)
    } else {
    if (user) {
    if (data.Money < 0) {
      const notEnoughMoney = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You do not have any money in your pocket to share.`)
      .setTimestamp();
      message.reply(notEnoughMoney)
    } else if(args[2] > data.Money) {
      const notEnoughMoney2 = new MessageEmbed()
      .setColor("#FF0000")
      .setDescription(`You do not have any enough money!.`)
      .setTimestamp();
      message.reply(notEnoughMoney2)
    } else {
      const amount = Math.round(args[2])
      data.Money = data.Money - amount;
      data.save();
      economy.findOne({ Guild: message.guild.id, User: user.id },async(err, toGive)=>{
        toGive.Money = toGive.Money + amount;
        toGive.save();
      });
      const gaveMoney = new MessageEmbed()
      .setColor("#00FF00")
      .setDescription(`You successfully gave ${user} $${Math.round(amount)}.`)
      .setTimestamp();
      message.reply(gaveMoney)
     }
  }
  }
})
 }

}

