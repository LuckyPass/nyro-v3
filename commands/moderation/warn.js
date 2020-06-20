const commando = require("discord.js-commando");
const numeral = require("numeral");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
var mongoose = require("mongoose");
//                                                                  ↓ collection name optional
var url =
  "";
let warns = require("../../models/warns.js");
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = class warnCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "warn",
      group: "moderation",
      memberName: "warn",
      description: "Warn a member",
      guildOnly: true,
      userPermissions: ["MANAGE_MESSAGES"],
      clientPermissions: ["MANAGE_MESSAGES"],
      args: [
        {
          key: "user",
          prompt: "Provide a user to warn.",
          type: 'member'
        },
        {
          key: "reason",
          default: "No reason specified",
          prompt: "Provide a reason",
          type: 'string'
        },
      ],
    });
  }

  async run(message, { user, reason }) {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      return message.channel.send(`You do not have the: \`Manage Messages\` permission`)
    }

    if (!user.kickable) {
      return message.channel.send(`I cannot warn that user.`)
    }

    if (message.author.id === user.id) {
      return message.channel.send(`You cannot warn yourself!`)
    }

    if (message.member.roles.cache.highest <= user.roles.cache.highest || message.guild.ownerID === user.id) {
      return message.channel.send(`That person either has higher or the same highest role than you or they are the owner of the server!`)
    }

    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: reason,
              },
            ],
          });
          let embed1 = new MessageEmbed()
            .setTitle("Warned")
            .setColor("RANDOM")
            .setDescription(`${user.user.tag} has been warned for: ${reason}`);
          newWarns.save();
          message.channel.send(embed1);
          console.log(`${user.user.tag} has been warned: ${reason}`);
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: reason,
          });
          data.save();
          let embed1 = new MessageEmbed()
            .setTitle("Warned")
            .setColor("RANDOM")
            .setDescription(`${user.user.tag} has been warned for: ${reason}`);
          return message.channel.send(embed1);
        }
      }
    );
  }
};
