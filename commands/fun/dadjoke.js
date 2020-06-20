const { Command, Client } = require("discord.js-commando");
const giveMeAJoke = require("discord-jokes")

module.exports = class dadjoke extends Command {
  constructor(client) {
    super(client, {
      name: "dadjoke",
      memberName: "dadjoke",
      group: "fun",
      description: "get a dad joke",
      format: "",
      aliases: ["dadjk"]
    });
  }
  async run(message) {
    giveMeAJoke.getRandomDadJoke (function(joke) {
        message.channel.send(joke)
  })
}
}
    