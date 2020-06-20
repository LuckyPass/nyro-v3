const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = class PornCommand extends Command {
  constructor(client) {
    super(client, {
      name: "porn",
      aliases: ["pgcontent"],
      group: "nsfw",
      memberName: "porn",
      description: "Shows you porn",
    });
  }

  async run(message) {
    if (message.channel.type === "text" && !message.channel.nsfw)
      return message.reply(`no no, get into a NSFW channel.`);

    const { data } = await (
      await fetch(`https://www.reddit.com/r/nsfw.json?sort=top&t=week`)
    ).json();

    if (!data.children.length)
      return message.channel.send(
        new MessageEmbed()
          .setColor("#3377de")
          .setDescription(`Couldn't get the post.`)
      );

    const post =
      data.children[Math.floor(Math.random() * data.children.length)];

    return message.channel.send(
      new MessageEmbed()
        .setColor("#3377de")
        .setAuthor(
          `${post.data.title}`,
          message.author.displayAvatarURL({ dynamic: true }),
          `https://reddit.com${post.data.permalink}`
        )
        .setImage(post.data.url)
        .setFooter(`👍 ${post.data.ups} | 💬 ${post.data.num_comments}`)
    );
  }
};
