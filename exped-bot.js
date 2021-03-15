require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule')
const TOKEN = process.env.TOKEN;

client.login(TOKEN);

// morning
var morningRule = new schedule.RecurrenceRule();
morningRule.hour = 9;
morningRule.minute = 45;
morningRule.tz = 'Etc/GMT+8';
//50 12 * * *
var morningExpeds = schedule.scheduleJob(morningRule, function() {
    message("Morning Expeditions");
})

// evening
var eveningRule = new schedule.RecurrenceRule();
eveningRule.hour = 17;
eveningRule.minute = 45;
eveningRule.tz = 'Etc/GMT+8';
//50 12 * * *
var eveningExpeds = schedule.scheduleJob(eveningRule, function() {
    message("Evening Expeditions");
})

// Bonus
var bonusRule = new schedule.RecurrenceRule();
bonusRule.hour = 15;
bonusRule.minute = 45;
bonusRule.tz = 'Etc/GMT+8';
bonusRule.dayOfWeek = [0, 6];
//50 12 * * *
var bonusExpeds = schedule.scheduleJob(bonusRule, function() {
    message("Bonus Expeditions");
})

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag} v4!`);

    morningExpeds.schedule();
    eveningExpeds.schedule();
    bonusExpeds.schedule();
    // message("Morning Expeditions");
    // client.channels.cache.get('783513086429888515').send("hi")
});

function message(exped) {
    var signedMembers = new Map();
    var signedNames = new Map();

    const titleName = {'OnTime': 'On Time', '152': 'Fifteen', '302': 'Thirty', '452': 'Fourty-Five', 'Skip': 'Skip'};
    var editBool = true;

    const embed = {
        title: exped,
        description: "@here It's time for expeds, Please react to when you can show up before :59 <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">",
        fields: [
            {
                name: "<:OnTime:" + client.emojis.cache.find(emoji => emoji.name === "OnTime") + "> On Time (0/5)",
                value: "-\n",
                inline: true
            },
            {
                name: "<:152:" + client.emojis.cache.find(emoji => emoji.name === "152") + "> Fifteen (0/5)",
                value: "-\n",
                inline: true
            },
            {
                name: "<:302:" + client.emojis.cache.find(emoji => emoji.name === "302") + "> Thirty (0/5)",
                value: "-\n",
                inline: true
            },
            {
                name: "<:452:" + client.emojis.cache.find(emoji => emoji.name === "452") + "> Fourty-Five (0/5)",
                value: "-\n",
                inline: true
            },
            {
                name: "<:Skip:" + client.emojis.cache.find(emoji => emoji.name === "Skip") + "> Skip (0/5)",
                value: "-\n",
                inline: true
            }
        ],
        color: '#FFA500'
    };

    client.channels.cache.get('811435136615972891').send("@here", {embed: embed}).then(function(message) {
        message.react(client.emojis.cache.find(emoji => emoji.name === "OnTime")).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "152"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "302"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "452"))).then(
            message.react(client.emojis.cache.find(emoji => emoji.name === "Skip")))


        /**
         * ADD REACTION METHOD
         */
        client.on('messageReactionAdd', (reaction, user) => {
            var userArray = [];
            var userIds = [];

            if (user.id !== '805522695708999723') {
                var name = null;
                if (message.guild.members.cache.get(user.id).nickname === null) {
                    name = user.username;
                } else {
                    name = message.guild.members.cache.get(user.id).nickname;
                }

                if (signedNames.has(reaction.emoji.name)) {
                    userArray = signedNames.get(reaction.emoji.name);
                    userArray.push(name);

                    userIds = signedMembers.get(reaction.emoji.name);
                    userIds.push(user.id);

                    signedNames.set(reaction.emoji.name, userArray);
                    signedMembers.set(reaction.emoji.name, userIds);
                } else {
                    userArray.push(name);
                    userIds.push(user.id);
                    signedNames.set(reaction.emoji.name, userArray);
                    signedMembers.set(reaction.emoji.name, userIds);
                }

                console.log(signedNames);
                console.log(signedMembers);
            }


            // reaction.users.cache.map(u => {
            //   if (u.id !== '805522695708999723') {
            //     var name = null;
            //     if (message.guild.members.cache.get(u.id).nickname === null) {
            //       name = user.username;
            //     } else {
            //       name = message.guild.members.cache.get(u.id).nickname;
            //     }

            //     userArray.push(name);
            //     userIds.push(u.id);
            //   }
            // });

            let num;
            if (reaction.emoji.name === 'OnTime') {
                num = 0;
            } else if (reaction.emoji.name === '152') {
                num = 1;
            } else if (reaction.emoji.name === '302') {
                num = 2;
            } else if (reaction.emoji.name === '452') {
                num = 3;
            } else if (reaction.emoji.name === 'Skip') {
                num = 4;
            }

            embed.fields[num].name = "<:" + reaction.emoji.name + ":" + client.emojis.cache.find(emoji => emoji.name === reaction.emoji.name) + "> " + titleName[reaction.emoji.name] + " (" + userArray.length +"/5)";
            embed.fields[num].value = userArray.join("\n");
            if (embed.fields[num].value === "") {
                embed.fields[num].value = "-\n";
            }
            if(editBool) {
                message.edit({embed: embed});
                signedMembers.set(reaction.emoji.name, userIds);
            }
        })


        /**
         * REMOVE REACTION METHOD
         */
        client.on('messageReactionRemove', (reaction, user) => {
            var userArray = [];
            var userIds = [];

            if (user.id !== '805522695708999723') {
                var name = null;
                if (message.guild.members.cache.get(user.id).nickname === null) {
                    name = user.username;
                } else {
                    name = message.guild.members.cache.get(user.id).nickname;
                }

                if (signedNames.has(reaction.emoji.name)) {
                    userArray = signedNames.get(reaction.emoji.name);
                    userIds = signedMembers.get(reaction.emoji.name);

                    const index = userArray.indexOf(name);
                    if (index > -1) {
                        userArray.splice(index, 1);
                        userIds.splice(index, 1);
                    }
                    signedNames.set(reaction.emoji.name, userArray);
                }
            }


            // reaction.users.cache.map(u => {
            //   if (u.id !== '805522695708999723') {
            //     var name = null;
            //     if (message.guild.members.cache.get(u.id).nickname === null) {
            //       name = user.username;
            //     } else {
            //       name = message.guild.members.cache.get(u.id).nickname;
            //     }

            //     userArray.push(name);
            //     userIds.push(u.id);
            //   }
            // });

            let num;
            if (reaction.emoji.name === 'OnTime') {
                num = 0;
            } else if (reaction.emoji.name === '152') {
                num = 1;
            } else if (reaction.emoji.name === '302') {
                num = 2;
            } else if (reaction.emoji.name === '452') {
                num = 3;
            } else if (reaction.emoji.name === 'Skip') {
                num = 4;
            }

            embed.fields[num].name = "<:" + reaction.emoji.name + ":" + client.emojis.cache.find(emoji => emoji.name === reaction.emoji.name) + "> " + titleName[reaction.emoji.name] + " (" + userArray.length +"/5)";
            embed.fields[num].value = userArray.join("\n");
            if (embed.fields[num].value === "") {
                embed.fields[num].value = "-\n";
            }
            if(editBool) {
                message.edit({embed: embed});
                signedMembers.set(reaction.emoji.name, userIds);
            }
            console.log(signedNames);
            console.log(signedMembers);
        })


        message.awaitReactions((reaction, user) => user.id === message.author.id,{time: (14*60000)}).then(collected => {
            var max;
            var maxCount;
            collected.map(emotes => {
                if (!max || (emotes.count > maxCount)) {
                    maxCount = emotes.count - 1;
                    max = emotes.emoji.name;
                }
            })
            console.log(max + " " + maxCount)

            editBool = false;

            switch (max) {
                case 'OnTime': {
                    console.log("entered on time")
                    client.channels.cache.get('811435136615972891').send("Majority voted for On Time with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '0 * * * *', function() {
                        alertExpeds(signedMembers, 'OnTime')
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case '152': {
                    console.log("entered on 15")
                    client.channels.cache.get('811435136615972891').send("Majority voted for :15 with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '15 * * * *', function() {
                        alertExpeds(signedMembers, '152')
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case '302': {
                    console.log("entered on 30")
                    client.channels.cache.get('811435136615972891').send("Majority voted for :30 with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '30 * * * *', function() {
                        alertExpeds(signedMembers, '302')
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case '452': {
                    console.log("entered on 45")
                    client.channels.cache.get('811435136615972891').send("Majority voted for :45 with a total of " + maxCount + " votes");
                    schedule.scheduleJob('alert-job', '45 * * * *', function() {
                        alertExpeds(signedMembers, '452')
                        schedule.cancelJob('alert-job')
                    })
                    break;
                }

                case 'Skip': {
                    console.log("entered on skip")
                    client.channels.cache.get('811435136615972891').send("Everyone is skipping!! Bunch of noobs!")
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

function alertExpeds(signedMembers, time) {
    var members = "";
    for (var i = 0; i < signedMembers.get(time).length; i++) {
        members += "<@" + signedMembers.get(time)[i] + ">  ";
    }
    client.channels.cache.get('811435136615972891').send("@here " + "Please log on now! <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">")
}

