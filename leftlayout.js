const Canvas = require("canvas");
const { MessageEmbed, MessageAttachment } = require("discord.js");


module.exports = {

  LayoutOne:async function(member, game) {
    
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
    ctx.fillStyle = "#FFFFFF";

    ctx.font = applyText(canvas, `Member left from ${member.guild.name}`);
    ctx.fillText(
      `Member left from ${member.guild.name}`,
      canvas.width / 2.5,
      canvas.height / 2.0
    );

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(
      `${member.user.tag}`,
      canvas.width / 2.5,
      canvas.height / 1.6
    );
    ctx.fillText(
      `We are down to #${member.guild.memberCount} members`,
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

const Iw = require("./models/imageWelcome.js");
    Iw.findOne({ ServerID: member.guild.id }, async (err, imageWelcome) => {
      if (!imageWelcome) return;
    const attachment = new MessageAttachment(result, "Member_Left.png");
      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Goodbye Member!")
        .attachFiles(attachment)
        .setImage("attachment://" + attachment.name);
      imageWelcome.LeaveDesc ? embed.setDescription(imageWelcome.LeaveDesc) : embed.setDescription("Goodbye member")
    
      member.guild.channels.cache.get(imageWelcome.IChannelID).send(embed);
    })
  }
}