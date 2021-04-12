require('dotenv').config();
const Discord = require('discord.js');
const WOKCommands = require('wokcommands')
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fs = require('fs');

// data
const infoMap = require('./info.js');

// functions
let infoHelper = require('./features/infoHelper');
const schedule = require("./features/scheduleRules");

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

    if (infoMap.has(message.content)) {
        infoHelper.info(message, infoMap, Discord);
    }
    // client.channels.cache.get('783513086429888515').send("hi")
});

client.login(TOKEN);
