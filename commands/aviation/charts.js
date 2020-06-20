const commando = require("discord.js-commando");
const { MessageEmbed } = require("discord.js")

module.exports = class charts extends commando.Command {
    constructor(client) {
      super(client, {
        name: "charts",
        group: "aviation",
        aliases: ['chart', 'ch'],
        memberName: "charts",
        description: "Return charts for the specified airport.",
        guildOnly: true,
      });
    }
   
    async run(message) {   

        const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");

        if (!args[1]) {
            const embed = new MessageEmbed()
            .setColor("FF0000")
            .setTitle(`Invalid!`)
            .setDescription(`You need to supply a valid ICAO code to get charts for.`)
            .setFooter(`This is not an offical source, please obtain it from the appropriate agency.`)
            message.channel.send(embed)
        } else {
        const embed = new MessageEmbed()
        .setColor("00FF00")
        .setTitle(`Charts for ${args[1].toUpperCase()}`)
        .setDescription(`<@${message.author.id}> [Click here to view charts](https://vau.aero/navdb/chart/${args[1].toUpperCase()}.pdf)`)
        .setFooter(`This is not an offical source, please obtain it from the appropriate agency.`)
        message.channel.send(embed)
        }
    }
}