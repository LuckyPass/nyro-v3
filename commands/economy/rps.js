const chooseArr = ["🗻", "📰", "✂"];
const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")
const ms = require("parse-ms");
var mongoose = require("mongoose");

var url = "";
let economy = require("../../models/economy.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function promptMessage (message, author, time, validReactions) {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
        .awaitReactions(filter, { max: 1, time: time})
        .then(collected => collected.first() && collected.first().emoji.name);
}

module.exports = class rpsCommand extends commando.Command {
    constructor(client) {
      super(client, {
        name: "rps",
        group: "economy",
        aliases: ['rockpaperscissors'],
	clientPermissions: ["MANAGE_MESSAGES"],
        memberName: "rps",
        description: "Play rock, paper, scissors to win $50.",
        guildOnly: true,
      });
    }
   
    async run(message) {   

        let timeout = 180000;
        let user = message.author;
    
        economy.findOne({ Guild: message.guild.id, User: user.id },async(err, data)=>{

            if (!data) {
                let newEconomy = new economy({
                    User: user.id,
                    Guild: message.guild.id,
                    Money: 0,
                    Bank: 0,
                    Tag: message.author.tag,
                    RPSTime: Date.now()
                })
                newEconomy.save(); 
            } else {

            if(err) message.reply(err)
            if (data.RPSTime !== null && timeout - (Date.now() - data.RPSTime) > 0) {
              let time = ms(timeout - (Date.now() - data.RPSTime));
          
              let timeEmbed = new MessageEmbed()
              .setColor("#FF0000")
              .setDescription(`You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
              message.channel.send(timeEmbed)
            } else {
      
                const embed = new MessageEmbed()
                .setColor("#ffffff")
                // .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
                .setDescription("Add a reaction to one of these emojis to play the game!")
                .setTimestamp();
    
            const m = await message.channel.send(embed);
            // Wait for a reaction to be added
            const reacted = await promptMessage(m, message.author, 30, chooseArr);
    
            // Get a random emoji from the array
            const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
    
            // Check if it's a win/tie/loss
            const result = await getResult(reacted, botChoice);
            // Clear the reactions
            await m.reactions.removeAll();
    
            embed
                .setDescription("")
                .addField(result, `${reacted} vs ${botChoice}`);
    
            m.edit(embed);
    
            function getResult(me, clientChosen) {
                if ((me === "🗻" && clientChosen === "✂") ||
                    (me === "📰" && clientChosen === "🗻") ||
                    (me === "✂" && clientChosen === "📰")) {
                        data.Money = data.Money + 50;
                        data.RPSTime = Date.now()
                        data.save();
                        return "You won. $50 has been added to your wallet!";
                } else if (me === clientChosen) {
                    return "It's a tie!";
                } else {
                    return "You lost!";
                }
            }
        
      }
          };
        })    
  }
}