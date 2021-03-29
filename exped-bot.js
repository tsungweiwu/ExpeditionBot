require('dotenv').config();
const Discord = require('discord.js');
const WOKCommands = require('wokcommands')
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

// data
const infoMap = require('./info.js');
const guildConfig = require('./guildConfig')

// functions
let infoHelper = require('./features/infoHelper');
const schedule = require("./features/scheduleRules");

client.on('ready', () => {
    new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features',
        showWarns: false
    }).setMongoPath(process.env.MONGO_URI)
        .setDefaultPrefix('.')
        .setBotOwner('156232419219996672')

    console.info(`Logged in as ${client.user.tag} v4!`);

    client.guilds.cache.forEach((guild) => {
        schedule.fort(client, guildConfig.get(guild.id));
        schedule.morning(client, guildConfig.get(guild.id));
        schedule.evening(client, guildConfig.get(guild.id));
        schedule.bonus(client, guildConfig.get(guild.id));
    })
    // message("Morning Expeditions");
    // client.channels.cache.get('783513086429888515').send("hi")
});


client.on('message', message => {
    if (infoMap.has(message.content)) {
        infoHelper.info(message, infoMap, Discord);
    }
    // client.channels.cache.get('783513086429888515').send("hi")
});

client.login(TOKEN);
