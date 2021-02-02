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
morningRule.minute = 50;
morningRule.tz = 'America/Los_Angeles';
//50 12 * * *
var morningExpeds = schedule.scheduleJob(morningRule, function() {
    message();
})

// evening
var eveningRule = new schedule.RecurrenceRule();
eveningRule.hour = 17;
eveningRule.minute = 50;
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
        message.react(client.emojis.cache.find(emoji => emoji.name === "OnTime")).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "152"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "302"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "452"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "Skip"))).then(
                schedule.scheduleJob('r-job', '59 * * * *', function() {
                    var find_max = {
                        'onTime': message.cache.get(client.emojis.cache.find(emoji => emoji.name === "OnTime")).count,
                        'fifteen': message.cache.get(client.emojis.cache.find(emoji => emoji.name === "152")).count,
                        'thirty': message.cache.get(client.emojis.cache.find(emoji => emoji.name === "302")).count,
                        'fourtyf': message.cache.get(client.emojis.cache.find(emoji => emoji.name === "452")).count,
                        'skip': message.cache.get(client.emojis.cache.find(emoji => emoji.name === "Skip")).count
                    }
                    var max;
                    for (var h in find_max) {
                        if (!max || (find_max[h] > find_max[max])) {
                            max = h;
                        }
                    }

                    switch (max) {
                        case 'onTime': {
                            schedule.scheduleJob('alert-job', '0 * * * *', function() {
                                alertExpeds()
                                schedule.cancelJob()
                            })
                            break;
                        }

                        case 'fifteen': {
                            schedule.scheduleJob('alert-job', '15 * * * *', function() {
                                alertExpeds()
                                schedule.cancelJob()
                            })
                            break;
                        }

                        case 'thirty': {
                            schedule.scheduleJob('alert-job', '30 * * * *', function() {
                                alertExpeds()
                                schedule.cancelJob()
                            })
                            break;
                        }

                        case 'fourtyf': {
                            schedule.scheduleJob('alert-job', '45 * * * *', function() {
                                alertExpeds()
                                schedule.cancelJob()
                            })
                            break;
                        }

                        case 'skip': {
                            break;
                        }
                    }

                    schedule.cancelJob('m-job')
                })
            )
    }).catch(function() {
        console.log("failed")
    })
}


function alertExpeds() {
    client.channels.cache.get('783513086429888515').send("@here Please log on now! <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">")
}

