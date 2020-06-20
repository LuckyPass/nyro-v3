const { Command, Client } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.js");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();
const client = new Client();

module.exports = class corona extends Command {
  constructor(client) {
    super(client, {
      name: "corona",
      memberName: "corona",
      group: "info",
      description: "Get info about the coronavirus",
      guarded: true,
      format: "(Country)"
    });
  }
  async run(message) {
    const args = message.content
  .slice(message.guild.commandPrefix.length)
  .split(" ");

if(!args[1]) {
  
      let embed = new MessageEmbed()
      .setColor("#ff2050")
      .setDescription("Please give the name of country")
      return message.channel.send(embed)
    }
    
    if(args.slice(1).join(" ") === "all") {
      let corona = await track.all() //it will give global cases
      
      let embed = new MessageEmbed()
      .setTitle("Global Cases")
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed)
      
      
      
    } else {
      let corona = await track.countries(args.slice(1).join(" ")) //change it to countries
      if(corona.country === undefined){
        
      let embed = new MessageEmbed()
      .setColor("#ff2050")
      .setDescription("Couldn't find that coutry. Remember this command only supports countries and not cities.")
       return message.reply(embed)
      }
      let embed = new MessageEmbed()
      .setTitle(`${corona.country}`)
      .setColor("#ff2050")
      .setDescription("Sometimes cases number may differ from small amount.")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true);
      
      return message.channel.send(embed)
      
      
    }
  }
}