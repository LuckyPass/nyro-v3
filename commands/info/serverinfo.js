const commando = require('discord.js-commando');
const numeral = require("numeral");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = class serverInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			aliases: ['server'],
			group: 'info',
			memberName: 'serverinfo',
			description: 'Gets information about the server.',
			guildOnly: true,
		});
	}

	async run(message) {

    
      const embed = new MessageEmbed();
    let { dbGuild, guild } = message;

    var users = ``;
    users += `All - \`${numeral(guild.members.cache.size).format('0,0')}\``;
    users += `\nHuman - \`${numeral(guild.members.cache.filter(m => !m.user.bot).size).format('0,0')}\``;
    users += `\nBot - \`${numeral(guild.members.cache.filter(m => m.user.bot).size).format('0,0')}\``;

    var channels = ``;
    channels += `All - \`${numeral(guild.channels.cache.size).format('0,0')}\``;
    channels += `\nText - \`${numeral(guild.channels.cache.filter(ch => ch.type == "text").size).format('0,0')}\``;
    channels += `\nVoice - \`${numeral(guild.channels.cache.filter(ch => ch.type == "voice").size).format('0,0')}\``;
    channels += `\nCategory - \`${numeral(guild.channels.cache.filter(ch => ch.type === `category`).size).format('0,0')}\``;

    
    embed.setTitle(guild.name)
    embed.setImage(guild.iconURL)
    embed.setColor("RANDOM")/*
    var description =   
    embed = embed.setDescription(description);*/
    embed.addField(`Guild ID:`, guild.id, true)
    embed.addField(`Owner:`, guild.owner, true)
    embed.addField('Created', `${moment(guild.createdAt).format('L')} (${moment(guild.createdAt).fromNow()})`, true)
    embed.addField('# of Bans', `\`${numeral(await guild.fetchBans().size).format('0,0')}\` banned members`, true)
    // embed.addBlankField()
    embed.addField(`# of Members:`, users, true)

    // var userStatuses =  ``;
    // userStatuses += `${client.customEmojis.online} \`${numeral(guild.presences.filter(p => p.status === `online`).size).format('0,0')}\``;
    // userStatuses += `\n${client.customEmojis.offline} \`${numeral(guild.presences.filter(p => p.status === `offline`).size).format('0,0')}\``;
    // userStatuses += `\n${client.customEmojis.idle} \`${numeral(guild.presences.filter(p => p.status === `idle`).size).format('0,0')}\``;
    // userStatuses += `\n${client.customEmojis.dnd} \`${numeral(guild.presences.filter(p => p.status === `dnd`).size).format('0,0')}\``;
    // embed = embed.addField(`User Statuses:`, userStatuses, true);

    embed.addField(`Channels:`, channels, true);
    return message.channel.send({ embed });
    
  }
};