const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const client = new Client();

module.exports = class help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      memberName: "help",
      group: "info",
      description: "View a list of all commands",
      guarded: true,
      format: "(commandName)",
      aliases: ["commands"],
    });
  }
  async run(message) {
    const args = message.content
      .slice(message.guild.commandPrefix.length)
      .trim()
      .split(/ +/g);

    const embed = new MessageEmbed().setColor("#db8127");
    if (!args[1]) args[1] = "";
    const group = this.client.registry.groups.find(
      (key) => key.id === args[1].toLowerCase()
    );
    const command = this.client.registry.commands.find(
      (key) =>
        key.name === args[1].toLowerCase() ||
        key.aliases.includes(args[1].toLowerCase())
    );

    if (!group && !command) {
      for (const [name, group] of this.client.registry.groups) {
        embed.addField(
          `• ${name.replace(/(\b\w)/gi, (str) => str.toUpperCase())} (${
            group.commands.size
          })`,
          group.commands
            // .filter((cmd) =>
            //   this.client.owners.map((u) => u.id).includes(message.author.id)
            //     ? cmd.ownerOnly
            //     : false
            // )
            .map((cmd) => `\`${cmd.name}\``)
            .join(", ") || "none"
        );
      }

      return message.channel.send(
        embed.setAuthor(
          `Available commands for ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
      );
    }

    if (group) {
      embed
        .setAuthor(
          `${group.name.replace(/(\b\w)/gi, (str) => str.toUpperCase())}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .addField(
          `• Commands (${group.commands.size})`,
          group.commands.map((cmd) => `\`${cmd.name}\``).join(", ") || "none"
        );

      return message.channel.send(embed);
    }

    if (command) {
      embed
        .setAuthor(
          `Help on: ${command.name} | ${message.author.username}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**Name**: ${command.name}\n**Aliases**: ${
            command.aliases.length
              ? command.aliases.map((alias) => `\`${alias}\``).join(", ")
              : "None"
          }\n**Description**: ${command.description || "None"}\n**Format**: ${
            message.guild.commandPrefix
          }${command.name} ${command.format || ""}`
        );

      return message.channel.send(embed);
    }
  }
};
