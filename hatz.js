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


client.once("ready", async () => {
  console.log(`Ready As: ${client.user.id}`);
});

client.on("message", async message => {
  const messages = ["1,000", "1,500", "2,000"]
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  if (message.content.startsWith(prefix + "proof")) {
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    const canvas = Canvas.createCanvas(1123, 69);
    const context = canvas.getContext('2d');
    const d = new Date();
    const name = args[1];
    const payer = 'AIRIDAS';
    const payer2 = 'vladbosss17';
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
    context.fillText(name, 728, 56);

    // context.fillStyle = "#4b4c48"
    //  context.font = '17px Gotham';
    //  context.fillText(`(${price})`, 810, 56);

    context.fillStyle = "#1c1d1b"
    context.font = '16px Gotham';
    context.fillText(date, 8, 30);

    context.fillStyle = "#1c1d1b"
    context.font = '16px Gotham';
    context.fillText(d.toLocaleTimeString(), 9, 55);

    const attachments = new Discord.MessageAttachment(canvas.toBuffer(), "rank.png");
    client.channels.cache.get('1091073356855521286').send(attachments);
  }
})

client.login(process.env['token'])

