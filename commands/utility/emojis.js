const { Command, Client } = require("discord.js-commando");
const {MessageEmbed} = require("discord.js");
const config = require("../../config.js");

module.exports = class emojis extends Command {
  constructor(client) {
    super(client, {
      name: "emojis",
      memberName: "emojis",
      group: "utility",
      description: "View all the emojis in your server.",
      guarded: true,
      guildOnly: true,
      format: "",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
   
   let Emojis="";
        let EmojisAnimated="";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id){
            return client.emojis.cache.get(id).toString()
        } 
        message.guild.emojis.cache.forEach(emoji=>{
            OverallEmojis++;
            if(emoji.animated){
                Animated++;
                EmojisAnimated+=Emoji(emoji.id)
            }else{
                EmojiCount++;
                Emojis+=Emoji(emoji.id)
            }
        })
        let Embed = new MessageEmbed()
        .setTitle(`Emojis in ${message.guild.name}.`)
        .setDescription(`**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**Over all emojis [${OverallEmojis}]**`)
        .setColor(`RANDOM`)
        message.channel.send(Embed)
  }
  }