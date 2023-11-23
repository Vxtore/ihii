const Discord = require("discord.js");
const db = require("quick.db");
const {
  Client,
  Intents
} = require('discord.js');
const client = new Client({
  intents: [Intents.FLAGS.GUILDS]
});
const prefix = "+";
const Canvas = require('canvas')
const canvas = require('canvas')
const moment = require('moment')
const fs = require('fs')

client.once("ready", async () => {
  console.log(`Ready As: ${client.user.id}`);
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "fruit")) {
    setInterval(async function() {
      let file = fs.readFileSync("./fruits.txt", { encoding: "utf-8" })
      let firstline = file.split("\n")[0]
      file = file.split("\n").slice(1).join("\n");
      fs.writeFileSync("./fruits.txt", file);
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const messages = ["Permanent Dough", "Permanent Leopard", "Permanent Dragon", "Permanent Venom", "Permanent Rumble", "Permanent Dough", "Permanent Shadow", "Permanent Soul", "Permanent Dark"]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const canvas = Canvas.createCanvas(731, 567);
      const context = canvas.getContext('2d');
      const name = args[1];
      const background = await Canvas.loadImage('./fruit.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      context.shadowColor = "#151313";
      context.shadowBlur = 7;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.fillStyle = "#FFDB58"
      context.font = '19px Gotham';
      context.fillText(`Sent gift <${randomMessage}> to ${firstline}!`, 140, 35);



      const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png");
      client.channels.cache.get('1086362035496943698').send(attachments);
    }, 4000)
  }

  if (message.content.startsWith(prefix + "gamepass")) {
    setInterval(async function() {
      let file = fs.readFileSync("./gamepass.txt", { encoding: "utf-8" })
      let firstline = file.split("\n")[0]
      file = file.split("\n").slice(1).join("\n");
      fs.writeFileSync("./gamepass.txt", file);
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const messages = ["+1 Fruit Storage", "2x Mastery", "2x Drop Chance", "Dark Blade", "Fruit Notifier", "2x Money", "Faster Boats"]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const canvas = Canvas.createCanvas(731, 567);
      const context = canvas.getContext('2d');
      const name = args[1];
      const background = await Canvas.loadImage('./gamepass.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      context.shadowColor = "#000000";
      context.shadowBlur = 7;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.fillStyle = "#FFDB58"
      context.font = '19px Gotham';
      context.fillText(`Sent gift <${randomMessage}> to ${firstline}!`, 160, 35);



      const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png");
      client.channels.cache.get('1086362035496943698').send(attachments);
    }, 4000)
  }
})

client.login(process.env['token'])

