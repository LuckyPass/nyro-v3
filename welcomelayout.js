const Canvas = require("canvas");
const { MessageEmbed, MessageAttachment } = require("discord.js");


module.exports = {
  LayoutOne:async function(member, game) {
const client = global.client;
    
const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 100;
  do {
    ctx.font = `${(fontSize -= 2)}px Comfortaa`;
  } while (ctx.measureText(text).width > canvas.width - 500);

  return ctx.font;
};

const canvas = Canvas.createCanvas(1024, 450);  
const ctx = canvas.getContext("2d");


const background = await Canvas.loadImage(game);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = "40px sans-serif";
    ctx.fillStyle = "#ffffff";

    ctx.font = applyText(canvas, `Welcome to ${member.guild.name}`);
    ctx.fillText(
      `Welcome to ${member.guild.name}`,
      canvas.width / 2.5,
      canvas.height / 2.0
    );

    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${member.user.tag}`,
      canvas.width / 2.5,
      canvas.height / 1.6
    );
    ctx.fillText(
      `You are #${member.guild.memberCount} member!`,
      canvas.width / 2.5,
      canvas.height / 1.3
    );
    ctx.beginPath();
    ctx.arc(126, 245, 101, 0, Math.PI * 2, true);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(125, 245, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 25, 145, 200, 200);

    const result = canvas.toBuffer();
const jr = require("./models/joinRole.js");
     jr.findOne({ ServerID: member.guild.id }, async (err, joinRole) => {
        if (!joinRole) return;

        let role = member.guild.roles.cache.get(joinRole.JoinRoleID);
        member.roles.add(role);
      });
const Iw = require("./models/imageWelcome.js");
    Iw.findOne({ ServerID: member.guild.id }, async (err, imageWelcome) => {    
      if (!imageWelcome) return;
      
    const attachment = new MessageAttachment(result, "New_Member.png");
      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Welcome New Member!")
        .attachFiles(attachment)
        .setImage("attachment://" + attachment.name)
      imageWelcome.Description ? embed.setDescription(imageWelcome.Description) : embed.setDescription("Welcome to our server! Please make sure to read the rules and enjoy!")
      member.guild.channels.cache.get(imageWelcome.IChannelID).send(embed);
    })
    }
  }