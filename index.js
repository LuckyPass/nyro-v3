const { prefix, mongo, TOKEN, nodes } = require("./config.js");
const version = require("./package.json").version;
const Commando = require("discord.js-commando");
let prefixes = require("./models/prefix.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const sqlite = require("sqlite");
const path = require("path");
const { Manager } = require("lavaclient");

try {
  mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

var client = new Commando.Client({
  commandPrefix: prefix,
  owner: ["336159680244219905", "484031943021690883", "470205527675240449", "295198180143005699", "535585397435006987"],
  invite: "https://discord.gg/UtaEsFB",
  unknownCommandResponse: false,
  presence: {
    game: {
      name: `Starting`,
      type: "STREAMING",
      url: "https://twitch.tv/Pokimane",
    },
  },
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["moderation", "Moderation", true],
    ["info", "Info", true],
    ["fun", "Fun", true],
    ["utility", "Utility", true],
    ["miscellaneous", "Miscellaneous"],
    ["util", "Misc", true],
    ["economy", "Economy", true],
    ["welcome", "Welcome", true],
    ["aviation", "Aviation", true],
    ["music", "Music", true],
    ["commands", "Command States", true],
    ["nsfw", "NSFW", true]
  ])
  .registerDefaultCommands({
    unknownCommand: false,
    help: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands")); //Runs commands inside the "commands" base folder
global.client = client;

const DBL = require("dblapi.js");
const dbl = new DBL(
  "",
  client
);

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`); //log when the bot is ready to be used
  client.music = new Manager(nodes, {
    shards: client.shard ? client.shard.count : 1,
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) return guild.shard.send(payload);
    },
  });

  client.ws.on("VOICE_SERVER_UPDATE", (pk) => client.music.serverUpdate(pk));
  client.ws.on("VOICE_STATE_UPDATE", (pk) => client.music.stateUpdate(pk));

  client.music.on("open", (node) => console.log(`opened node`));
  client.music.on("error", (err) => console.error(err));

  await client.music.init("702214772749238392");

  // client.music = new ErelaClient(client, [
  //   {
  //     host: "localhost",
  //     port: 2333,
  //     password: "anotherday"
  //   }
  // ])
  // client.musicPlayers = new Map();
  // client.music.on("nodeConnect", node => console.log("new node connected"));
  // client.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
  // client.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
  // client.music.on("queueEnd", player => {
  //   player.textChannel.send("Queue has ended.")
  //   client.music.players.destroy(player.guild.id);
  // });
  setInterval(() => {
    let activities = [
      `n!help | V3.3.0`,
      `${client.users.cache.size} Users | ${client.guilds.cache.size} Guilds`,
    ];
    let game = activities[Math.floor(Math.random() * activities.length)];

    client.user.setActivity(game, {
      type: "WATCHING",
    });
  }, 20000);
  setInterval(() => {
    dbl.postStats(client.guilds.cache.size);
  }, 1800000);
});

client.on("error", (error) => {
  console.error(error.stack);
  client.channels.cache
    .get("707541179574517810")
    .send(`An error has occurred: ${error.stack}`);
});

client.on("commandError", (command, error, message) => {
  require("./events/client/commandError.js")(client, command, error, message);
});

//Guild Member Add Event
client.on("guildMemberAdd", async (member) => {
  const guildMemberAdd = require("./events/guild/guildMemberAdd.js");
  guildMemberAdd(member);
});

// Guild Member Remove Event
client.on("guildMemberRemove", async (member) => {
  const guildMemberRemove = require("./events/guild/guildMemberRemove.js");
  guildMemberRemove(member);
});
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Message Edit Event

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let messageUpdate = require("./events/guild/messageUpdate.js");
  messageUpdate(oldMessage, newMessage);
});

// //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Message Delete Event
client.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete.js")(message);
});

// //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // Channel Create Event
client.on("channelCreate", async (channel) => {
  require("./events/guild/channelCreate.js")(channel);
});

// //━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// // Channel Delete Event
client.on("channelDelete", async (channel) => {
  require("./events/guild/channelDelete.js")(channel);
});

// Bot add to a guild event
client.on("guildCreate", async (guild) => {
  require("./events/client/guildCreate.js")(guild);
});
// Bot leave from a guild event
client.on("guildDelete", async (guild) => {
  require("./events/client/guildDelete.js")(guild);
});

client.login(TOKEN);
