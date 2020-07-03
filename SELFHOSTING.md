# Nyro v3

Welcome to Nyro v3's source code. This is mainly for people who would like to relive v3, or just make a guild-bound bot.

This guide assumes that you have a basic knowledge of JavaScript, that you have some common sense, and have set up a bot before.

We do not provide self-hosting support for errors or anything you do.

We are **not** liable for anything you do with the bots code, you are **on your own**.

### Setting Up

#### Bot envoirment

1. Enter a directory (home directory on a vps)
2. Install [git](https://git-scm.com/downloads) if you have not already.
3. Open a terminal at that directory and run `git clone https://github.com/NikStudios/nyro-v3`
4. Wait for it to clone, and then open the directory when git is done
5. Install [node.js](https://nodejs.org/en/download/) if you have not already.
6. In the directory make sure to have a code editor ready, or make sure to have a terminal
7. In that terminal, run `npm i`
8. Once you've done that, you are almost ready to start. Install pm2 `npm i -g pm2` (has to be a sudo/admin terminal)

#### Mongodb

1. Go to [Mongodb.com](https://www.mongodb.com/)
2. Press **Log In**
3. Sign Up or Login to an existing account
4. On the clusters page, press Create New Cluster. I reccomend making a new account if you do not want to pay for another cluster.
5. Go through the steps and then wait for the cluster to be created. (3-5 minutes)
6. Go back to the main page and press **Database Access**
7. Add your VPS/Home IP.
8. Go to [config.js](https://github.com/NikStudios/nyro-v3/blob/master/config.js)
9. Place your connection string in the mongo property of the object.
10. Go into `commands/economy` and inside each file, there is a variable of `url`, place your mongodb URI in that string. (dont ask why its like that, I didn't do that)

#### Lavalink

1. Go to [the CI server](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1) and download the contents in the .zip file.
2. Go here and copy-paste the contents of the [application.yml](https://github.com/Frederikam/Lavalink/blob/master/LavalinkServer/application.yml.example) example.
3. Go to your bot's directory and make a `lavalink` folder.
4. Place all of the .zip file contents into that folder, than create a `application.yml`.
5. In the `application.yml` file, place the contents you got from [this file](https://github.com/Frederikam/Lavalink/blob/master/LavalinkServer/application.yml.example)
6. Modifiy [config.js](https://github.com/NikStudios/nyro-v3/blob/master/config.js) where it says nodes, and modify those contents in both config.js and the application.yml file. (eg port, password)
7. Go into [index.js](https://github.com/NikStudios/nyro-v3/blob/master/index.js) and then go to line **79** and in that string, place the bot's ID.
8. Open another sudo/admin terminal and cd into lavalink.
9. Run the command: `java -jar Lavalink.jar`
10. Let it start.
11. Then you can start the bot with `pm2 start ./index.js`, `pm2 stop index`, `npm run build`

## Contributors

- [Nyro Development Team](https://github.com/NikStudios) - Nyro Development GitHub
- [Community](https://discord.gg/YdHkWMm) - The discord of people who helped by reporting bugs
- [MeLike2D](https://github.com/MeLike2D) - The guy who provided us with a Lavalink.jar file with filters.
- [Sxmurai](https://github.com/Sxmurai) - Wrote this guide, and has helped out with the whole bot, especially with v4.

## Resources

- [Discord.js](https://discord.js.org/#/docs/main/master/general/welcome)
- [Commando](https://discord.js.org/#/docs/commando/master/general/welcome)
- [Mongodb](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)

2020/7/3 - © Nyro Development Team. All rights reserved.
