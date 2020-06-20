const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class dog extends Command {
  constructor(client) {
    super(client, {
      name: "dog",
      memberName: "dog",
      group: "fun",
      description: "See a dog",
      format: "",
      aliases: ["doggo"],
    });
  }
  async run(message) {
    let body = await this.getDog();

    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Doggosssssss!")
      .setImage(body.message)
      .setTimestamp()
      .setFooter("Nik's Utilities Development");
    return message.channel.send(embed);
  }

  async getDog() {
    return await (
      await fetch(`https://dog.ceo/api/breeds/image/random`)
    ).json();
  }
};
