require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule')

// at a particular Date & Time



var date = new Date();
var current_hour = date.getHours();
var current_min = date.getMinutes();

client.login(TOKEN);

// morning
var morningRule = new schedule.RecurrenceRule();
morningRule.hour = 9;
morningRule.minute = 45;
morningRule.tz = 'America/Los_Angeles';
//50 12 * * *
var morningExpeds = schedule.scheduleJob(morningRule, function() {
    message();
})

// evening
var eveningRule = new schedule.RecurrenceRule();
eveningRule.hour = 17;
eveningRule.minute = 45;
eveningRule.tz = 'America/Los_Angeles';
//50 12 * * *
var eveningExpeds = schedule.scheduleJob(eveningRule, function() {
    message();
})

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);

    morningExpeds.schedule();
    eveningExpeds.schedule();
    // client.channels.cache.get('783513086429888515').send("hi")
});


function message() {
    client.channels.cache.get('783513086429888515').send("@here It's time for expeds, Please react to when you can show up <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">").then(function(message) {
        message.react(client.emojis.cache.find(emoji => emoji.name === "152")).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "302"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "452"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "OnTime"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "Skip")))
    }).catch(function() {
        console.log("failed")
    })
}

