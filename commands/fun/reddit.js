const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const api = require("imageapi.js")

module.exports = class reddit extends Command {
  constructor(client) {
    super(client, {
      name: "reddit",
      memberName: "reddit",
      group: "fun",
      description: "Sends a picture or text from the provided subreddit",
      guarded: true,
      format: "(subreddit)",
    });
  }
  async run(message) {
    const client = message.client;
          const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");
try{
let {MessageEmbed} = require("discord.js")
        let Subreddit = args.slice(1).join("")
        if(!Subreddit){ 
            const Embed = new MessageEmbed()
            .setTitle(`You did not specify your subreddit!`)
            .setColor('RANDOM')
          message.channel.send(Embed)
                       }
            let img = await api(Subreddit)
            const Embed = new MessageEmbed()
            .setTitle(`A random image from r/${Subreddit}`)
            .setColor('RANDOM')
            .setImage(img)
            .setURL(`https://reddit.com/r/${Subreddit}`)
            message.channel.send(Embed)
  }catch(error){
    
            const Embed = new MessageEmbed()
            .setTitle(`Couldnt find that subreddit!`)
            .setColor('RANDOM')
  return message.reply(Embed)
  }
    }          
  }