const {Command} = require("discord.js-commando");
const statics = require("../../models/stats.js")
module.exports = class serverStats extends Command {
    constructor(client) {
      super(client, {
        name: "serverstats",
        aliases: ["ss"],
        group: "utility",
        memberName: "serverstats",
        description: "Enable server stats",
        guildOnly: true,
        userPermissions: ["MANAGE_CHANNELS"],
        clientPermissions: ["MANAGE_CHANNELS"]
      });
    }  
    async run(message) {  
      let { guild } = message;
      let client = message.client;   
    const args = message.content
    .slice(message.guild.commandPrefix.length)
    .split(" ");
    const totalsize = message.guild.memberCount;
    const botsize = message.guild.members.cache.filter(m => m.user.bot).size;
    const humansize = totalsize - botsize;
if (!args[1]) return message.channel.send(":x: Invalid parameters. Correct usage: `n!serverstats enable` | `n!serverstats disable`.");
      
statics.findOne({ServerID: guild.id}, async (err, stats) => {  
if(args[1] === 'enable') {
  
  if(!stats){
  guild.channels.create('Server Statistics', {
    type: 'category',
    permissionOverwrites: [
       {
         id: guild.id,
         deny: ['CONNECT'],
      },
    ],
  }).then(channel => {
    channel.setPosition(0)
  


  guild.channels.create(`Total Users: ${totalsize}`, {
    type: 'voice',
    permissionOverwrites: [
      {
        id: guild.id,
        deny: ['CONNECT']
      },
    ],
  }).then(channel1 => {
    channel1.setParent(channel.id)
    let x = channel1.id
  

  guild.channels.create(`Human Users: ${humansize}`, {
    type: 'voice',
    permissionOverwrites: [
      {
        id: guild.id,
        deny: ['CONNECT']
      },
    ],
  }).then(channel2 => {
    channel2.setParent(channel.id)
    let y = channel2.id
  

  guild.channels.create(`Bot Users: ${botsize}`, {
    type: 'voice',
    permissionOverwrites: [
      {
        id: guild.id,
        deny: ['CONNECT']
      },
    ],
  }).then(async channel3 => {
    channel3.setParent(channel.id)
    let z = channel3.id
    
    let newStats = new statics({
    ServerID: guild.id,
    Category: channel.id,
    Chnl1: x,
    Chnl2: y,
    Chnl3: z
  }).save()
message.channel.send(`:white_check_mark: Serverstats enabled for this server.`)
})
})
  })
})
  
  }else{
    guild.channels.cache.filter(c => c.type === "category").get(stats.Category) ? null : guild.channels.create('Server Statistics', {type: 'category',permissionOverwrites: [ { id: guild.id,deny: ['CONNECT'], }, ],}).then(channel => { channel.setPosition(0)
    stats.Category = channel.id;
    stats.updated = true;
    stats.save();
message.channel.send(`:white_check_mark: Serverstats enabled for this server. Creating 1st channel...`)
    })
    
    guild.channels.cache.filter(c => c.type === "voice").get(stats.Chnl1) ? null : guild.channels.create(`Total Users: ${totalsize}`, {type: 'voice', permissionOverwrites: [{ id: guild.id, deny: ['CONNECT']},], }).then(channel1 => {channel1.setParent(stats.Category); let x = channel1.id
    stats.Chnl1 = x;
    stats.updated = true;
    stats.save();
message.channel.send(`:white_check_mark: Serverstats enabled for this server. Creating 2nd channel...`)
    
    })
    guild.channels.cache.filter(c => c.type === "voice").get(stats.Chnl2) ? null : guild.channels.create(`Human Users: ${humansize}`, {type: 'voice',permissionOverwrites: [
      { id: guild.id, deny: ['CONNECT'] }, ], }).then(channel2 => { channel2.setParent(stats.Category); let y = channel2.id
    stats.Chnl2 = y;
    stats.updated = true;
    stats.save();
message.channel.send(`:white_check_mark: Serverstats enabled for this server. Creating 3rd Channel...`)
                                                                   
    })
    guild.channels.cache.filter(c => c.type === "voice").get(stats.Chnl3) ? null : guild.channels.create(`Bot Users: ${botsize}`, { type: 'voice', permissionOverwrites: [ { id: guild.id, deny: ['CONNECT'] }, ], }).then(async channel3 => { channel3.setParent(stats.Category); let z = channel3.id
    stats.Chnl3 = z;
    stats.updated = true;
    stats.save();
message.channel.send(`:white_check_mark: Serverstats enabled for this server. Creating category...`)
    
    })
  }
    }else if (args[1] === 'disable') {
      if(!stats){
        message.reply("This server doesnt have server stats enabled!")
      }
      let t = stats.Chnl1;
      let m = stats.Chnl2;
      let b = stats.Chnl3;
      let c = stats.Category;
      
        client.channels.cache.get(t) ? client.channels.cache.get(t).delete() : null;
        client.channels.cache.get(m) ? client.channels.cache.get(m).delete() : null;
        client.channels.cache.get(b) ? client.channels.cache.get(b).delete() : null;
        client.channels.cache.get(c) ? client.channels.cache.get(c).delete() : null;
        statics.findOneAndDelete({ServerID: guild.id});
        message.channel.send(`:white_check_mark: Serverstats disabled for this server.`) 
}
    })
}
}