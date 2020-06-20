let {LayoutOne} = require("../../welcomelayout.js");
module.exports = async function(member) {
let thumb = require("../../models/thumbnail.js")
      
 thumb.findOne({ServerID: member.guild.id}, async(err, Thumbnail) => {
    if(!Thumbnail){
let game = "https://i.imgur.com/9I0q8vp.png";
      LayoutOne(member, game);
          }else{
     let game = Thumbnail.Thumbnail
     LayoutOne(member, game)
          }
       })
let statics = require("../../models/stats.js");
  let guild = member.guild;
  statics.findOne({ServerID: guild.id}, async (err, stats) => {
    if(stats){
     let chnl1 = guild.channels.cache.filter(c => c.type === "voice").get(stats.Chnl1)
     let chnl2 = guild.channels.cache.filter(c => c.type === "voice").get(stats.Chnl2)
     let chnl3 = guild.channels.cache.filter(c => c.type === "voice").get(stats.Chnl3)
      const totalsize = guild.memberCount;
      const botsize = guild.members.cache.filter(m => m.user.bot).size;
      const humansize = totalsize - botsize;

     chnl1 ? chnl1.setName(`Total Users: ${guild.memberCount}`) : null;
      chnl2 ? chnl2.setName(`Human Users: ${humansize}`) : null;
        chnl3 ? chnl3.setName(`Bot Users: ${botsize}`) : null;
    }
  })
  };