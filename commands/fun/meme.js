const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class meme extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      memberName: "meme",
      group: "fun",
      description: "Sends a meme",
      guarded: true,
      format: "",
    });
  }
  async run(message) {
      let randomPuppy = require("random-puppy");
const subReddits = ["dankmeme", "meme", "me_irl"];
        
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

       
        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
        }
  }