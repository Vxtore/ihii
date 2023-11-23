const Discord = require("discord.js");
const db = require("quick.db");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const prefix = "+";
const ms = require('ms')

client.once("ready", async () => {
  client.user.setStatus('online')
    .then(console.log)
    .catch(console.error);
  console.log(`Ready As: ${client.user.id}`);
  ///////////////////////////////////////////////////////
  setInterval(async function() {
    let guild = client.guilds.cache.get('1166494128280965360')
    const numbers = await guild.invites.fetch()
      .then(numbers =>
        [...numbers.values()]
      )
    console.log(numbers.length)
    if (numbers.length !== 1001) return console.log(`There are ${numbers.length} invites minimum is 999.`)
    const invites = await guild.invites.fetch()
      .then(invites =>
        [...invites.values()].sort((a, b) => a.createdAt - b.createdAt).slice(0, 200)
      )

    for (const invite of invites) {
      await invite.delete();
      await sleep(6000);
    }
  }, 3600000);
  ///////////////////////////////////////////////////////
  setInterval(async function() {
    let guild = client.guilds.cache.get('1166494128280965360')
    const numbers = await guild.invites.fetch()
      .then(numbers =>
        [...numbers.values()]
      )
    console.log(numbers.length)
    if (numbers.length !== 1001) return console.log(`There are ${numbers.length} invites minimum is 999.`)
    const invites = await guild.invites.fetch()
      .then(invites =>
        [...invites.values()].sort((a, b) => a.createdAt - b.createdAt).slice(0, 200)
      )

    for (const invite of invites) {
      await invite.delete();
      await sleep(6000);
    }
  }, 3600000);
  ///////////////////////////////////////////////////////
  setInterval(async function() {
    const ha = client.channels.cache.get('1166494128280965360')
    const messages = await ha.messages.fetch({ limit: 1 })
    const randommessage = messages.random()
    const [attachments] = randommessage.attachments.values();
    client.channels.cache.get('1166494128280965360').send([attachments]).then(msg => {
      randommessage.delete({ timeout: 2000 })
    })
  }, 18000000);
});


let sleep = async (ms) => await new Promise(r => setTimeout(r, ms));

client.on("message", async message => {
  if (message.content.startsWith(prefix + "delete-invites")) {
    message.channel.send('sss')
    const numbers = await message.guild.fetchInvites()
      .then(numbers =>
        [...numbers.values()]
      )
    console.log(numbers.length)
    if (numbers.length !== 1001) return message.channel.send(`There are ${numbers.length} invites minimum is 999.`)
    const invites = await message.guild.fetchInvites()
      .then(invites =>
        [...invites.values()].sort((a, b) => a.createdAt - b.createdAt).slice(0, 500)
      )

    for (const invite of invites) {
      await invite.delete();
      await sleep(3000);
    }
  }
  if (message.content.startsWith(prefix + "hatza")) {
    function chunkArray(array, size, results = []) {
      while (array.length) results.push(array.splice(0, size));
      return results;
    }

    const members = chunkArray(message.guild.members.cache.map(m => m), 7)
    let i = 0

    sendMessage()
    function sendMessage(chunk = 1) {
      console.log(i)
      message.channel.send(members[chunk - 1].map(m => `<@${m.id}>`).join(", ")).then(msg => {
        msg.delete({ timeout: 2000 })
      })
      if (members.length == chunk) return;
      setTimeout(() => sendMessage(chunk + 1), 3500);
      i++
    }

  }
  if (message.content.startsWith(prefix + "giveaway")) {
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    let duration = args[1];
    let winnerCount = args[2];

    if (!duration)
      return message.channel.send('Please provide a duration for the giveaway!\nThe abbreviations for units of time are: `d (days), h (hours), m (minutes), s (seconds)`');
    if (
      !args[1].endsWith("d") &&
      !args[1].endsWith("h") &&
      !args[1].endsWith("m") &&
      !args[1].endsWith("s")
    )
      return message.channel.send('Please provide a duration for the giveaway!\nThe abbreviations for units of time are: `d (days), h (hours), m (minutes), s (seconds)`');

    if (!winnerCount) return message.channel.send('Please provide the number of winners for the giveaway! E.g. `1w`')

    if (!args[2])
      return message.channel.send('Please provide the number of winners for the giveaway! E.g. `@baby`');

    let giveawayChannel = message.mentions.channels.first();
    if (!giveawayChannel || !args[3]) return message.channel.send("Please provide a valid channel to start the giveaway!")

    let prize = args.slice(4).join(" ");
    if (!prize) return message.channel.send('Please provide a prize to start the giveaway!');
    db.set(`winner_${message.guild.id}`, message.mentions.users.first().id)
    const endTime = Date.now() + ms(duration);
    let startGiveawayEmbed = new Discord.MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(`React with 🎉 to participate in the giveaway!\nEnds in: <t:${Math.floor(endTime / 1000)}:R>\nHosted By: **${message.author}**\nWinners: **1**`)
      .setColor('#5865f2')
      .setTimestamp(Date.now() + ms(args[1]))
      .setFooter("Giveaway ends");

    let embedGiveawayHandle = await giveawayChannel.send(startGiveawayEmbed)
    embedGiveawayHandle.react("🎉").catch(console.error);

    setTimeout(() => {
      let winner = db.get(`winner_${message.guild.id}`)

      const endedEmbedGiveaway = new Discord.MessageEmbed()
        .setTitle(prize)
        .setDescription(`Ended: <t:${Math.floor(endTime / 1000)}:R>\nHosted By: **${message.author}**\nWinner: **${winnerCount}**\nParticipants: **${embedGiveawayHandle.reactions.cache.get("🎉").count - 1}**`)
        .setColor('#2f3136')
        .setTimestamp(Date.now() + ms(args[1]))
        .setFooter("Giveaway ended");

      embedGiveawayHandle.edit(endedEmbedGiveaway);

      const congratsEmbedGiveaway = new Discord.MessageEmbed()
        .setDescription(`🥳 Congratulations <@${winner}>! You just won **${prize}**!`)
        .setColor('#2f3136')

      giveawayChannel.send(congratsEmbedGiveaway).catch(console.error);
    }, ms(args[1]));



  }
  if (message.content.startsWith(prefix + "random")) {
    const ha = client.channels.cache.get('1166494128280965360')
    const messages = await ha.messages.fetch({ limit: 1 })
    const randommessage = messages.random()
    const [attachments] = randommessage.attachments.values();
    client.channels.cache.get('1166494128280965360').send([attachments]).then(msg => {
      randommessage.delete({ timeout: 2000 })
    })
  }

  if (message.content.startsWith(prefix + "invites")) {
    let user = message.mentions.members.first() || message.author;
    let invites = db.fetch(`invites_${message.guild.id}_${user.id}`);
    const embed = new Discord.MessageEmbed()
      .setDescription(`**Has ${invites || 0} invites right now**\n`)
      .setColor("2f3136")
      .setTitle(`${user.username || user.user.username} invites `)
      .setThumbnail(
        `https://o.remove.bg/downloads/c56926ec-18d2-4a5e-a903-7dfd98df790c/image-removebg-preview.png`
      )
      .setFooter(
        `Bot by baby#1337`,
        `https://o.remove.bg/downloads/c56926ec-18d2-4a5e-a903-7dfd98df790c/image-removebg-preview.png`
      )
      .setTimestamp();
    message.channel.send(embed);
  }
});

const developers = ["659038301331783680", "744243996267905076"];

client.on("message", message => {
  if (message.content.startsWith(prefix + "add")) {
    if (!developers.includes(message.author.id)) return;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    let amount = args[2];
    let user = message.mentions.members.first();
    const embed = new Discord.MessageEmbed()
      .setDescription(`Added ${amount} To ${user}`)
      .setColor("#2f3136");
    message.channel.send(embed);
    db.add(`invites_${message.guild.id}_${user.id}`, amount);
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "remove")) {
    if (!developers.includes(message.author.id)) return;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);
    let amount = args[2];
    let user = message.mentions.members.first();
    const embed = new Discord.MessageEmbed()
      .setDescription(`Removed ${amount} From ${user}`)
      .setColor("#2f3136");
    message.channel.send(embed);
    db.subtract(`invites_${message.guild.id}_${user.id}`, amount);
  }
});


client.on("message", async message => {
  if (message.content.startsWith("redeem")) {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(0);
    if (message.channel.type === 'dm') {


      if (args[1] == 'gamepass') {
        let invites = db.fetch(`invites_1033419874690674708_${message.author.id}`);
        if (invites < 4) {
          const embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> You need \`4\` invite(s) to claim **Any Gamepass in Bloxfruits!**\nYou can check your invites here <#1067518832979230750>.`)
            .setColor(`#2F3136`)
          message.channel.send(embed)
        }
        if (invites >= 4) {
          const embed = new Discord.MessageEmbed()
            .setTitle('Reward Processing..').setThumbnail(`https://cdn.discordapp.com/emojis/585955989178810379.gif?size=96&quality=lossless`)
            .setColor('#2f3136')
            .setDescription(`**-** Claimed: \`GAMEPASS\` 
**-** Receive in: **24 hours**

 If you want __additional rewards__ (it can be several rewards of the same type) you still have **24** hours after that you will not be able to collect any more reward.`)
          message.channel.send(embed)
          db.subtract(`invites_1033419874690674708_${message.author.id}`, 4);
        }
      }
      if (args[1] == 'fruits') {
        let invites = db.fetch(`invites_1033419874690674708_${message.author.id}`);
        if (invites < 5) {
          const embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> You need \`5\` invite(s) to claim **Any Fruits in Bloxfruits!**\nYou can check your invites here <#1067518832979230750>.`)
            .setColor(`#2F3136`)
          message.channel.send(embed)
        }
        if (invites >= 5) {
          const embed = new Discord.MessageEmbed()
            .setTitle('Reward Processing..').setThumbnail(`https://cdn.discordapp.com/emojis/585955989178810379.gif?size=96&quality=lossless`)
            .setColor('#2f3136')
            .setDescription(`**-** Claimed: \`FRUITS\` 
**-** Receive in: **24 hours**

 If you want __additional rewards__ (it can be several rewards of the same type) you still have **24** hours after that you will not be able to collect any more reward.`)
          message.channel.send(embed)
          db.subtract(`invites_1033419874690674708_${message.author.id}`, 5);
        }
      }

      if (args[1] == 'giftcard') {
        let invites = db.fetch(`invites_1033419874690674708_${message.author.id}`);
        if (invites < 6) {
          const embed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> You need \`6\` invite(s) to claim **20$ Roblox Giftcard!**\nYou can check your invites here <#1067518832979230750>.`)
            .setColor(`#2F3136`)
          message.channel.send(embed)
        }
        if (invites >= 6) {
          const embed = new Discord.MessageEmbed()
            .setTitle('Reward Processing..').setThumbnail(`https://cdn.discordapp.com/emojis/585955989178810379.gif?size=96&quality=lossless`)
            .setColor('#2f3136')
            .setDescription(`**-** Claimed: \`20$ Roblox Giftcard\` 
**-** Receive in: **24 hours**

 If you want __additional rewards__ (it can be several rewards of the same type) you still have **24** hours after that you will not be able to collect any more reward.`)
          message.channel.send(embed)
          db.subtract(`invites_1033419874690674708_${message.author.id}`, 6);
        }
      }

    }
  }
})


const guildInvites = new Map();

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on('ready', () => {
  console.log(`${client.user.tag} has logged in.`);
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites()
      .then(invites => guildInvites.set(guild.id, invites))
      .catch(err => console.log(err));
  });
});

client.on('inviteCreate', async invite => {
  const numbers = await invite.guild.fetchInvites()
    .then(numbers => [...numbers.values()])
  if (numbers.length !== 1001) return console.log(`There are ${numbers.length} invites minimum is 999.`)
  const invites = await guild.fetchInvites()
    .then(invites => [...invites.values()].sort((a, b) => a.createdAt - b.createdAt).slice(0, 200))

  for (const invite of invites) {
    if (invite.inviter.id === '659038301331783680') return;
    if (invite.inviter.id === '801895617600421890') return;
    await invite.delete();
    await sleep(7000);
  }
})

client.on('guildMemberAdd', async member => {
  const catchedInvites = guildInvites.get(member.guild.id)
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites)
  try {
    const usedInvite = newInvites.find(inv => catchedInvites.get(inv.code).uses < inv.uses)
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1)
    db.set(`inviter_${member.id}`, usedInvite.inviter.id)
    let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`)
    // client.channels.cache.get('1057222758771208212').send(`${member} **Joined;** invited By <@${usedInvite.inviter.id}>`)
  } catch (err) {
    console.log(err)
  }

});



client.on("guildMemberRemove", member => {
  let inviter2 = db.fetch(`inviter_${member.id}`)
  const iv2 = client.users.cache.get(inviter2);
  const mi = member.guild.members.cache.get(inviter2);
  db.subtract(`invites_${member.guild.id}_${inviter2}`, 1)
  // client.channels.cache.get('1057222758771208212').send(`${member} Left, Invited by <@${inviter2}>`)
})

require('discord-buttons')(client)
const { MessageMenuOption, MessageMenu, MessageActionRow, MessageButton } = require('discord-buttons');


client.on("message", async (msg) => {
  if (msg.author.id === "659038301331783680") {
    if (msg.content === "+button") {
      let select = new MessageButton()
        .setLabel(`Check Invites`)
        .setEmoji(`1067807154192523314`)
        .setID(`button`)
        .setStyle("green");
      const Row1 = new MessageActionRow()
        .addComponent(select)

      const embed = new Discord.MessageEmbed()
        //   .setTitle('<:bloxfruit:1067495220243091536> Bloxfruit Official Events')
        .setDescription(`In order to check your invites press the button below !`)
        .setColor(`#2F3136`)

      await msg.channel.send(embed, { components: [Row1] });


    }
    if (msg.content === "+menu") {
      const seçenek1 = new MessageMenuOption().setLabel('Any Gamepass in Bloxfruits').setEmoji('🎉').setValue('25').setDescription('You must have 4 invites to claim this reward.')
      const seçenek2 = new MessageMenuOption().setLabel('Any Fruits in Bloxfruits').setEmoji('🎉').setValue('50').setDescription('You must have 5 invites to claim this reward.')
      const seçenek3 = new MessageMenuOption().setLabel('20$ Roblox Giftcard').setEmoji('🎉').setValue('75').setDescription('You must have 6 invites to claim this reward.')
      const select = new MessageMenu()
        .setID('select1')
        .setPlaceholder('Pick your prize.')
        .addOption(seçenek1)
        .addOption(seçenek2)
        .addOption(seçenek3)
        .setMaxValues(1)
        .setMinValues(1)
      const Row1 = new MessageActionRow()
        .addComponent(select)

      const embed = new Discord.MessageEmbed()
        .setTitle('<:bloxfruit:1067495220243091536> Bloxfruit Official Rewards')
        .setThumbnail('https://media.discordapp.net/attachments/1057222758771208212/1067498528231923802/2c7962a17c92e401738264e92d71230f.sm-removebg-preview.png')
        .setDescription(`How to claim your __rewards__:

**-** Select your prize from the <#1073970218340208672>.
**-** Follow the steps in <#1068202341397971006>.
**-** Interact with our __menu system__.
**-** Enjoy your __rewards__!`)
        .setColor(`#2F3136`)

      await msg.channel.send(embed, { components: [Row1] });
    }
  }
})

client.on("clickButton", async (button) => {
  if (button.id == 'button') {
    const member = button.clicker.member
    let invites = db.fetch(`invites_${button.guild.id}_${member.id}`) || 0;
    const embed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setDescription(`You have **${invites}** invites.`)
    button.reply.send(embed, true)
  }
})

client.on('clickMenu', async menu => {
  const Member = menu.clicker.member
  let invites = db.fetch(`invites_${menu.guild.id}_${Member.id}`);
  if (menu.values[0] == '25') {
    if (invites < 4) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`<@${Member.id}> You need \`4\` invite(s) to claim **Any Gamepass in Bloxfruits!**\nYou can check your invites here <#1067518832979230750>.`)
        .setColor(`#2F3136`)
      menu.reply.send(embed, true)
    }
    if (invites >= 4) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`<:verified:1067513737600315507> Verification`)
        .setColor('#2f3136')
        .setDescription(`You're eligible to receive __Any Gamepass in Bloxfruits__!
In order to redeem your \`GAMEPASS\` please follow the steps below:

**1.** Click on my profile.
**2.** Send \`redeem gamepass\` in my dms.
**3.** Wait for my answer.`)
      menu.reply.send(embed, true)
    }

  }

  if (menu.values[0] == '50') {
    if (invites < 5) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`<@${Member.id}> You need \`5\` invite(s) to claim **Any Fruits in Bloxfruits!**\nYou can check your invites here <#1067518832979230750>.`)
        .setColor(`#2F3136`)
      menu.reply.send(embed, true)
    }
    if (invites >= 5) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`<:verified:1067513737600315507> Verification`)
        .setColor('#2f3136')
        .setDescription(`You're eligible to receive __Any Fruits in Bloxfruits__!
In order to redeem your \`FRUITS\` please follow the steps below:

**1.** Click on my profile.
**2.** Send \`redeem fruits\` in my dms.
**3.** Wait for my answer.`)
      menu.reply.send(embed, true)
    }
  }

  if (menu.values[0] == '75') {
    if (invites < 6) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`<@${Member.id}> You need \`6\` invite(s) to claim a **20$ Roblox Giftcard!**\nYou can check your invites here <#1067518832979230750>.`)
        .setColor(`#2F3136`)
      menu.reply.send(embed, true)
    }
    if (invites >= 6) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`<:verified:1067513737600315507> Verification`)
        .setColor('#2f3136')
        .setDescription(`You're eligible to receive __20$ Roblox Giftcard__!
In order to redeem your \`20$ Roblox Giftcard\` please follow the steps below:

**1.** Click on my profile.
**2.** Send \`redeem giftcard\` in my dms. 
**3.** Wait for my answer.`)
      menu.reply.send(embed, true)
    }
  }
})

client.login(process.env['token'])
