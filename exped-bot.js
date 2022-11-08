const dotenv = require('dotenv')
dotenv.config()

const { Client, GatewayIntentBits, Partials } = require('discord.js')

const WOK = require('wokcommands')
const path = require('path')
const mongoose = require('mongoose')

const TOKEN = process.env.TOKEN;
const translate = require('@iamtraction/google-translate');

// data
const infoMap = require('./info.js');

// functions
let infoHelper = require('./features/infoHelper');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel]
});

client.on('ready', async () => {
    new WOK({
        client,
        commandsDir: path.join(__dirname, "commands"),
        featuresDir: path.join(__dirname, "features"),
        botOwners: ["156232419219996672"],
        mongoUri: process.env.MONGO_URI,
        dbOptions: {
            keepAlive: true
        }
    })

    console.info(`Logged in as ${client.user.tag} v5!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (infoMap.has(message.content.toLowerCase())) {
        infoHelper.info(message, infoMap);
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

client.login(TOKEN);
