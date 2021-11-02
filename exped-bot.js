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

// milk
const milkId = '472829226094166034';
let deletedContent = '';
let deletedAuthor;
let deletedTime = '';

let updatedContent = '';
let updatedAuthor;
let updatedTime = '';

// kitsune
const kitsId = '474716101435981836';
let deletedContent2 = '';
let deletedAuthor2;
let deletedTime2 = '';

let updatedContent2 = '';
let updatedAuthor2;
let updatedTime2 = '';

// degen
const degenId = '861020088681365544';
let deletedContent3 = '';
let deletedAuthor3;
let deletedTime3 = '';

let updatedContent3 = '';
let updatedAuthor3;
let updatedTime3 = '';

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
        // milk
        if (message.channel.guild.id === milkId) {
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

        // kitsune
        if (message.channel.guild.id === kitsId) {
            if (deletedContent2 === '' || deletedAuthor2 === null) return message.channel.send('No Messages Found')
            console.log(deletedTime2)
            message.channel.send({
                embed: {
                    author: {
                        name: deletedAuthor2.username,
                        icon_url: `https://cdn.discordapp.com/avatars/${deletedAuthor2.id}/${deletedAuthor2.avatar}.png?size=256`
                    },
                    description: deletedContent2,
                    footer: {
                        text: deletedTime2
                    }
                }
            }).then(r => {
            })
        }

        // degen
        if (message.channel.guild.id === degenId) {
            if (deletedContent3 === '' || deletedAuthor3 === null) return message.channel.send('No Messages Found')
            console.log(deletedTime3)
            message.channel.send({
                embed: {
                    author: {
                        name: deletedAuthor3.username,
                        icon_url: `https://cdn.discordapp.com/avatars/${deletedAuthor3.id}/${deletedAuthor3.avatar}.png?size=256`
                    },
                    description: deletedContent3,
                    footer: {
                        text: deletedTime3
                    }
                }
            }).then(r => {
            })
        }

    }

    if (message.content === '.edit') {
        //milk
        if (message.channel.guild.id === milkId) {
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

        //kitsune
        if (message.channel.guild.id === kitsId) {
            if (updatedContent2 === '' || updatedAuthor2 === null) return message.channel.send('No Messages Found')
            message.channel.send({
                embed: {
                    author: {
                        name: updatedAuthor2.username,
                        icon_url: `https://cdn.discordapp.com/avatars/${updatedAuthor2.id}/${updatedAuthor2.avatar}.png?size=256`
                    },
                    description: updatedContent2,
                    footer: {
                        text: updatedTime2
                    }
                }
            }).then(r => {
            })
        }

        //degen
        if (message.channel.guild.id === degenId) {
            if (updatedContent3 === '' || updatedAuthor3 === null) return message.channel.send('No Messages Found')
            message.channel.send({
                embed: {
                    author: {
                        name: updatedAuthor3.username,
                        icon_url: `https://cdn.discordapp.com/avatars/${updatedAuthor3.id}/${updatedAuthor3.avatar}.png?size=256`
                    },
                    description: updatedContent3,
                    footer: {
                        text: updatedTime3
                    }
                }
            }).then(r => {
            })
        }

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
    console.log(messageDelete.author.bot)
    if (messageDelete.author.bot) return;
    // milk
    if (messageDelete.channel.guild.id === milkId) {
        deletedContent = messageDelete.content
        deletedAuthor = messageDelete.author

        let d = new Date(messageDelete.createdTimestamp);
        deletedTime = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Deleted Message - ${deletedTime} \nAuthor: ${deletedAuthor} \nMessage: ${deletedContent}`);
    }

    // kitsune
    if (messageDelete.channel.guild.id === kitsId) {
        deletedContent2 = messageDelete.content
        deletedAuthor2 = messageDelete.author

        let d = new Date(messageDelete.createdTimestamp);
        deletedTime2 = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Deleted Message - ${deletedTime2} \nAuthor: ${deletedAuthor2} \nMessage: ${deletedContent2}`);
    }

    // degen
    if (messageDelete.channel.guild.id === degenId) {
        deletedContent3 = messageDelete.content
        deletedAuthor3 = messageDelete.author

        let d = new Date(messageDelete.createdTimestamp);
        deletedTime3 = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Deleted Message - ${deletedTime3} \nAuthor: ${deletedAuthor3} \nMessage: ${deletedContent3}`);
    }

})

client.on('messageUpdate', messageUpdate => {
    console.log(messageUpdate.author.bot)
    if (messageUpdate.author.bot) return;
    // milk
    if (messageUpdate.channel.guild.id === milkId) {
        updatedContent = messageUpdate.content
        updatedAuthor = messageUpdate.author

        let d = new Date(messageUpdate.createdTimestamp);
        updatedTime = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Updated Message - ${updatedTime} \nAuthor: ${updatedAuthor} \nMessage: ${updatedContent}`);
    }

    // kitsune
    if (messageUpdate.channel.guild.id === kitsId) {
        updatedContent2 = messageUpdate.content
        updatedAuthor2 = messageUpdate.author

        let d = new Date(messageUpdate.createdTimestamp);
        updatedTime2 = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Updated Message - ${updatedTime2} \nAuthor: ${updatedAuthor2} \nMessage: ${updatedContent2}`);
    }

    // degen
    if (messageUpdate.channel.guild.id === degenId) {
        updatedContent3 = messageUpdate.content
        updatedAuthor3 = messageUpdate.author

        let d = new Date(messageUpdate.createdTimestamp);
        updatedTime3 = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes();

        console.log(`Updated Message - ${updatedTime3} \nAuthor: ${updatedAuthor3} \nMessage: ${updatedContent3}`);
    }
})

client.login(TOKEN);
