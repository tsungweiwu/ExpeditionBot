require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

// data
const infoMap = require('./info.js');
const adminRole = '156232419219996672';
const inviteLink = 'https://discord.com/oauth2/authorize?client_id=805522695708999723&scope=bot';

// functions
let calc = require('./functions/calcAB.js');
let adminFunc = require('./functions/admin');
let helper = require('./functions/help');
let mockFunc = require('./functions/mock');
let infoHelper = require('./functions/infoHelper');
const schedule = require("./functions/scheduleRules");

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag} v4!`);

    schedule.fort(client);
    schedule.morning(client);
    schedule.evening(client);
    schedule.bonus(client);

    // message("Morning Expeditions");
    // client.channels.cache.get('783513086429888515').send("hi")
});


client.on('message', message => {

    if (message.content.startsWith('.calc')) {
        calc.calcAB(message);
    }

    if (message.author.id === adminRole) {
        adminFunc.data(message, client);
    }

    if (message.content === '.invite') {
        return message.channel.send(inviteLink);
    }

    if (message.content === ".help") {
        helper.helpInfo(message);
    }

    if (infoMap.has(message.content)) {
        infoHelper.info(message, infoMap, Discord);
    }

    if (message.content === ".mock") {
        mockFunc.mock(message);
    }
    // client.channels.cache.get('783513086429888515').send("hi")
});

client.login(TOKEN);
