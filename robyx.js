const Discord = require("discord.js");
const db = require("quick.db");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const prefix = "+";
const ms = require('ms')
const moment = require('moment')
const Canvas = require('canvas')
const canvas = require('canvas')
const fs = require('fs')


client.once("ready", async () => {
  client.user.setActivity('Claim free robux')
  const enabled = db.get(`enabled_1086361493198606376`)
  setInterval(async function() {
    if (enabled === true) {
      let file = fs.readFileSync("./names.txt", { encoding: "utf-8" })
      let firstline = file.split("\n")[0]
      file = file.split("\n").slice(1).join("\n");
      fs.writeFileSync("./names.txt", file);
      const messages = ["3,000"]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];


      const canvas = Canvas.createCanvas(1123, 69);
      const context = canvas.getContext('2d');
      const d = new Date();
      const name = firstline;
      const payer = 'FpsLeet';
      const payer2 = 'blinded';
      const date = moment.utc().format("LL");
      const background = await Canvas.loadImage('./proof.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      context.fillStyle = "#1c1d1b"
      context.font = '18px Gotham';
      context.fillText(payer, 227, 35);
      context.fillText(payer, 458, 31);

      context.fillStyle = "#1c1d1b"
      context.font = '16px Gotham';
      context.fillText(payer2, 228, 54);

      context.fillStyle = "#393b3d"
      context.font = '17px Gotham';
      context.fillText(randomMessage, 616, 31);

      context.fillStyle = "#4b4c48"
      context.font = '17px Gotham';
      context.fillText(firstline, 728, 56);

      context.fillStyle = "#1c1d1b"
      context.font = '16px Gotham';
      context.fillText(date, 8, 30);

      context.fillStyle = "#1c1d1b"
      context.font = '16px Gotham';
      context.fillText(d.toLocaleTimeString(), 9, 55);

      const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png");
      client.channels.cache.get('995750863056408710').send(attachments);

    }
  }, 2000)
  console.log(`Ready As: ${client.user.id}`);
  ///////////////////////////////////////////////////////
  setInterval(async function() {
    let guild = client.guilds.cache.get('1086361493198606376')
    const numbers = await guild.fetchInvites()
      .then(numbers =>
        [...numbers.values()]
      )
    console.log(numbers.length)
    if (numbers.length !== 1001) return console.log(`There are ${numbers.length} invites minimum is 1001.`)
    const invites = await guild.fetchInvites()
      .then(invites =>
        [...invites.values()].sort((a, b) => a.createdAt - b.createdAt).slice(0, 200)
      )

    for (const invite of invites) {
      if (invite.inviter.id === '659038301331783680') return;
      if (invite.inviter.id === '801895617600421890') return;
      await invite.delete();
      await sleep(6000);
    }
  }, 300000);
});

client.login(process.env['token'])
