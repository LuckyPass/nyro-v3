const { Command, Client } = require("discord.js-commando");
const giveMeAJoke = require("discord-jokes");

module.exports = class joke extends Command {
  constructor(client) {
    super(client, {
      name: "chuckjoke",
      memberName: "joke",
      group: "fun",
      description: "get a joke",
      format: "",
      aliases: ["jk"],
    });
  }
  async run(message) {
    giveMeAJoke.getRandomCNJoke((joke) => {
      message.channel.send(joke);
    });
  }
};
