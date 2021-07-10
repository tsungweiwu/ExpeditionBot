require('dotenv').config();
const Discord = require('discord.js');
const WOKCommands = require('wokcommands')
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fs = require('fs');
const translate = require('@iamtraction/google-translate');

// data
const infoMap = require('./info.js');

// functions
let infoHelper = require('./features/infoHelper');
const schedule = require("./features/scheduleRules");

let deletedContent = '';
let deletedAuthor;
let deletedTime = '';

let updatedContent = '';
let updatedAuthor;
let updatedTime = '';

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        showWarns: false
    }).setDefaultPrefix('.')
        .setBotOwner('156232419219996672')

    console.info(`Logged in as ${client.user.tag} v4!`);

    let rawData = fs.readFileSync('guildConfig.json',
        {encoding:'utf8', flag:'r'});
    const jsonObject = JSON.parse(rawData);
    let guildConfig = new Map(Object.entries(jsonObject));

    guildConfig.forEach(guild => {
        schedule.fort(client, guild);
        if (guild.isMorning) schedule.morning(client, guild);
        if (guild.isEvening) schedule.evening(client, guild);
        if (guild.isBonus) schedule.bonus(client, guild);
    })

    // client.guilds.cache.forEach((guild) => {
    //
    // })
    // message("Morning Expeditions");
    // client.channels.cache.get('783513086429888515').send("hi")
});

client.on('guildCreate', guild => {
    let rawData = fs.readFileSync('guildConfig.json',
        {encoding:'utf8', flag:'r'});
    const jsonObject = JSON.parse(rawData);
    let guildConfig = new Map(Object.entries(jsonObject));

    let guildId = guild.id;
    let guildName = guild.name;

    let guildMap = {
        "name": guildName,
        "channelId": "",
        "fortChannelId": "",
        "raChannelId": "",
        "spamChannelId": "",
        "mentions": "",
        "fortMention": "",
        "isTimeVote": false,
        "job1": {},
        "job2": {},
        "isMorning": false,
        "isEvening": false,
        "isBonus": false
    }

    guildConfig.set(guildId, guildMap);

    let map = {};
    guildConfig.forEach(function(value, key){
        map[key] = value
    });

    let data = JSON.stringify(map, null, 4);
    fs.writeFileSync('guildConfig.json', data);
});

client.on('guildDelete', guild => {
    let rawData = fs.readFileSync('guildConfig.json',
        {encoding:'utf8', flag:'r'});
    const jsonObject = JSON.parse(rawData);
    let guildConfig = new Map(Object.entries(jsonObject));

    guildConfig.delete(guild.id);

    let map = {};
    guildConfig.forEach(function(value, key){
        map[key] = value
    });

    let data = JSON.stringify(map, null, 4);
    fs.writeFileSync('guildConfig.json', data);
});

client.on('message', message => {
    if (message.author.bot) return;

    if (infoMap.has(message.content.toLowerCase())) {
        infoHelper.info(message, infoMap, Discord);
    }

    if (message.content === '.snipe') {
        if (message.channel.guild.id !== '472829226094166034') return;
        if (deletedContent === '' || deletedAuthor === null) return message.channel.send('No Messages Found')
        console.log(deletedTime)
        message.channel.send({
            embed: {
                author: {
                    name: deletedAuthor.username,
                    icon_url: `https://cdn.discordapp.com/avatars/${deletedAuthor.id}/${deletedAuthor.avatar}.png?size=256`
                },
                description: deletedContent,
                footer: {
                    text: deletedTime
                }
             }
        }).then(r => {
        })
    }

    if (message.content === '.edit') {
        if (message.channel.guild.id !== '472829226094166034') return;
        if (updatedContent === '' || updatedAuthor === null) return message.channel.send('No Messages Found')
        message.channel.send({
            embed: {
                author: {
                    name: updatedAuthor.username,
                    icon_url: `https://cdn.discordapp.com/avatars/${updatedAuthor.id}/${updatedAuthor.avatar}.png?size=256`
                },
                description: updatedContent,
                footer: {
                    text: updatedTime
                }
            }
        }).then(r => {
        })
    }

    if (message.content.startsWith('.tt')) {
        let tMessage = message.content.split(" ");
        if (tMessage.length <= 1) return message.channel.send('Please **include the language you wish to translate to after the command** AND **include the message to translate after the language**')

        let lang = tMessage[1];
        let mNum = 4 + lang.length;
        let msg = message.content.substr(mNum);

        translate(msg, {from: 'en', to: lang}).then(res => {
            return message.channel.send(res.text);
        }).catch(err => {
            return message.channel.send(err);
        })
    }
});

client.on('messageDelete', messageDelete => {
    if (messageDelete.author.bot) return;
    if (messageDelete.channel.guild.id === '472829226094166034') {
        deletedContent = messageDelete.content
        deletedAuthor = messageDelete.author

        let d = new Date(messageDelete.createdTimestamp);
        deletedTime = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Deleted Message - ${deletedTime} \nAuthor: ${deletedAuthor} \nMessage: ${deletedContent}`);
    }
})

client.on('messageUpdate', messageUpdate => {
    if (messageUpdate.author.bot) return;
    if (messageUpdate.channel.guild.id === '472829226094166034') {
        updatedContent = messageUpdate.content
        updatedAuthor = messageUpdate.author

        let d = new Date(messageUpdate.createdTimestamp);
        updatedTime = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Updated Message - ${updatedTime} \nAuthor: ${updatedAuthor} \nMessage: ${updatedContent}`);
    }
})

client.login(TOKEN);
