require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const schedule = require('node-schedule')

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

// Bonus
var bonusRule = new schedule.RecurrenceRule();
bonusRule.hour = 15;
bonusRule.minute = 45;
bonusRule.tz = 'America/Los_Angeles';
bonusRule.dayOfWeek = [0, 6];
//50 12 * * *
var bonusExpeds = schedule.scheduleJob(bonusRule, function() {
    message();
})

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);

    morningExpeds.schedule();
    eveningExpeds.schedule();
    bonusExpeds.schedule();
    // client.channels.cache.get('783513086429888515').send("hi")
});

function message() {
    client.channels.cache.get('783513086429888515').send("@here It's time for expeds, Please react to when you can show up before :59 <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">").then(function(message) {
        message.react(client.emojis.cache.find(emoji => emoji.name === "OnTime")).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "152"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "302"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "452"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "Skip")))

        message.awaitReactions((reaction, user) => user.id === message.author.id,{time: (14*60000)}).then(collected => {
            var max;
            var maxCount;
            collected.map(emotes => {
                if (!max || (emotes.count > maxCount)) {
                    maxCount = emotes.count;
                    max = emotes.emoji.name;
                }
            })
            console.log(max + " " + maxCount)
            switch (max) {
                case 'OnTime': {
                    console.log("entered on time")
                    client.channels.cache.get('783513086429888515').send("Majority voted for On Time with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '0 * * * *', function() {
                        alertExpeds()
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case '152': {
                    console.log("entered on 15")
                    client.channels.cache.get('783513086429888515').send("Majority voted for :15 with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '15 * * * *', function() {
                        alertExpeds()
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case '302': {
                    console.log("entered on 30")
                    client.channels.cache.get('783513086429888515').send("Majority voted for 30 with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '30 * * * *', function() {
                        alertExpeds()
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case '452': {
                    console.log("entered on 45")
                    client.channels.cache.get('783513086429888515').send("Majority voted for 45 with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '45 * * * *', function() {
                        alertExpeds()
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case 'Skip': {
                    client.channels.cache.get('783513086429888515').send("Everyone is skipping!! Bunch of noobs!")
                    break;
                }
            }

        })
    }).catch(function() {
        console.log("failed")
    })

}

client.on('message', message => {
    if (message.content === '.dan') {
        return message.channel.send('Sending the Dan Signal! Calling <@282966925519093761>!')
    }

    if (message.content === '.cat') {
        return message.channel.send('Sending the Kitty Signal! Calling <@322511661753696257>!')
    }

    if (message.content === '.sher') {
        return message.channel.send('Sending the Sher Signal! Calling <@588914329253052421>!')
    }

    if (message.content === '.kell') {
        return message.channel.send('Sending the Kelly Signal! Calling <@709659335554367510>!')
    }

    if (message.content === '.edi') {
        return message.channel.send('Sending the Edi Signal! Calling <@156232419219996672>!')
    }
    // client.channels.cache.get('783513086429888515').send("hi")
});

function alertExpeds() {
    client.channels.cache.get('783513086429888515').send("@here Please log on now! <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">")
}

