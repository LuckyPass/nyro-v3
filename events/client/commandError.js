let Discord = require("discord.js");

module.exports = (client, command, error, message) => {

  console.error(error.stack);
  client.channels.cache
    .get("715293277502570546")
    .send(
      `**${command.name}** ouputed an error in **${message.guild.name}** (ID: ${message.guild.id})\nError: \`\`\`${error}\`\`\` Message Content: \`\`\`${message.content}\`\`\``
    );
}