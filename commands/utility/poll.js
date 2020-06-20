const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")

module.exports = class pollcommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: ['p'],
            group: 'info',
            memberName: 'poll',
            description: 'Initiate a simple poll.',
            guildOnly: true,
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }

    async run(message) {

        message.delete()

        const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");

        const Embed = new MessageEmbed()
        .setColor(0xFFC300)
        .setTitle("Initiate Poll")
        .setDescription(`${message.guild.commandPrefix}poll to initiate a simple yes or no poll`);



        if(!args[1]){
            message.channel.send(Embed);
        } else {

        let msgArgs = args.splice(1).join(" ");

        const Embed = new MessageEmbed()
        .setColor(0xFFC300)
        .setTitle("Poll!")
        .setDescription("📋" + "**" + msgArgs + "**");

        message.channel.send(Embed).then(messageReaction => {
            messageReaction.react("👍");
            messageReaction.react("👎");
        });
    }
  }
};