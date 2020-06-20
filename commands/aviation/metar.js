const https = require('https');
const Discord = require(`discord.js-commando`)
const { MessageEmbed } = require("discord.js");
const { Command, Client } = require("discord.js-commando");

module.exports = class metar extends Command {
    constructor(Client) {
      super(Client, {
        name: "metar",
        memberName: "metar",
        group: "aviation",
        description: "Return latest METAR for the airport requested",
        guarded: true,
        format: "metar icao",
      });
    }
    async run(message) {

        const args = message.content
        .slice(message.guild.commandPrefix.length)
        .split(" ");

function getMetar(icao) { // THIS IS ASYNC!
    return new Promise((resolve, reject) => {
        var options = {
            headers: { 'X-API-Key': "5241af60225ae640e1faae40e4" }
        };
        var resData = "";
        https.get(`https://api.checkwx.com/metar/${icao}/decoded`, options, res => {
            if (res.statusCode != 200) { reject(Error(`Server rejected our request with status code ${res.statusCode}.`)) };
            res.on("data", d => resData += d);
            res.on("end", function () {
                resolve(JSON.parse(resData));
            });
        }).on("error", e => reject(e));
    })
}
function metar(metar, args) {
    if (!args[1]){ // no parameter passed
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag)
        .setTitle(":mag: Please provide an airport ICAO Code")
        .setDescription(`For example, to query METAR of Tokyo Haneda International Airport, type \`n!metar rjtt\`.`)
        message.channel.send(embed)
        return;
    }
    getMetar(args[1]).then(
        function (metar) { // handle a successful request
            if (metar.results == 0) { // no result :-(
                const embed2 = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag)
                .setTitle(":no_entry_sign: No result")
                .setDescription(`Make sure you are entering a valid ICAO code of an existing airport.`)
                message.channel.send(embed2)
            } else {
                let i = metar.data[0]; // Many fields are optional, so we must expect its non-existence
                let content = "";
                try { content += `\`${i.flight_category}\` Premitted\n\n` } catch{ };
                try {
                    content += `:dash: **Wind**: ${i.wind.speed_kts} Knots @ ${i.wind.degrees} Degrees${(i.wind.gust_kts) ? `, Gust ${i.wind.gust_kts} Knots` : ""}\n`;
                } catch{ };
                try { content += `:thermometer: **Temperature**: ${i.temperature.celsius}\u2103 / ${i.temperature.fahrenheit}\u2109\n` } catch{ };
                try { content += `:droplet: **Dewpoint**: ${i.dewpoint.celsius}\u2103 / ${i.dewpoint.fahrenheit}\u2109\n` } catch{ };
                try { content += `:umbrella: **Humidity**: ${i.humidity.percent}%\n` } catch{ };
                try { content += `:chart_with_upwards_trend: **Barometer**: ${i.barometer.hg}Hg / ${i.barometer.mb}hP\n` } catch{ };
                try { content += `:cloud_rain: Currently **raining** ${i.rain.inches} Inches\n` } catch{ };
                try { content += `:snowflake: Currently **snowing** ${i.snow.inches} Inches\n` } catch{ };
                if (i.clouds && i.clouds.length > 0) { // is array and not empty
                    content += "\n:cloud: **Clouds**\n";
                    i.clouds.forEach(
                        function (element, index) {
                            content += `Layer ${index + 1} - ${element.text}${(element.base_feet_agl) ? ` @ ${element.base_feet_agl}ft` : ""}\n`
                        }
                    );
                }
                if (i.conditions && i.conditions.length > 0) { // is array and not empty
                    content += "\n:warning: **Conditions**\n";
                    i.conditions.forEach(
                        function (element) {
                            content += `${element.text}\n`
                        }
                    );
                }
                content += `\n:scroll: **Raw entry**: \`${i.raw_text}\`\n*These data were observed at ${i.observed}*`;
                const embed3 = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag)
                .setTitle(`Latest METAR report of **${i.icao} - ${i.station.name}**`)
                .setDescription(content)
                message.channel.send(embed3)
            }
        }
    )
        .catch(
            function (error) {
                console.error("\u2717   Promise rejected, request failed due to: " + error);
                const embed4 = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag)
                .setTitle(":dizzy_face: Unable to fetch data")
                .setDescription("The HTTP request to CheckWX's API has failed, this problem is logged." +
                `\n**Internal Error: ${error.toString()}**`)
                message.channel.send(embed4)
            }
        );
}

metar(message, args)

}
}