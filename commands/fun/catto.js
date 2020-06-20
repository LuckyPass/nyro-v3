const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class catto extends Command {
  constructor(client) {
    super(client, {
      name: "catto",
      memberName: "catto",
      group: "fun",
      description: "See a catto",
      format: "",
      aliases: ["cat"],
    });
  }
  async run(message) {
    const superagent = require("superagent");
    let embed1 = new MessageEmbed()
      .setTitle("Looking for cattos")
      .setColor("GREEN");
    let msg = await message.channel.send(embed1);

    let { body } = await superagent.get(
      `https://aws.random.cat/meow?ref=apilist.fun`
    );
    if (!{ body }) return message.channel.send("Please try again later!");

    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Cattosssssss!")
      .setImage(body.file)
      .setTimestamp()
      .setFooter("Nik's Utilities Development");
    msg.edit(embed);
  }
};
