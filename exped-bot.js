require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const schedule = require('node-schedule')
const TOKEN = process.env.TOKEN;

client.login(TOKEN);

// fort
const fortRule = new schedule.RecurrenceRule();
fortRule.hour = 19;
fortRule.minute = 00;
fortRule.tz = 'Etc/GMT+8';
//50 12 * * *
const fortRace = schedule.scheduleJob(fortRule, function () {
    fortAnnounce("Guild Fort Race");
});

// morning
const morningRule = new schedule.RecurrenceRule();
morningRule.hour = 9;
morningRule.minute = 45;
morningRule.tz = 'Etc/GMT+8';
//50 12 * * *
const morningExpeds = schedule.scheduleJob(morningRule, function () {
    message("Morning Expeditions");
});

// evening
const eveningRule = new schedule.RecurrenceRule();
eveningRule.hour = 17;
eveningRule.minute = 45;
eveningRule.tz = 'Etc/GMT+8';
//50 12 * * *
const eveningExpeds = schedule.scheduleJob(eveningRule, function () {
    message("Evening Expeditions");
});

// Bonus
const bonusRule = new schedule.RecurrenceRule();
bonusRule.hour = 15;
bonusRule.minute = 45;
bonusRule.tz = 'Etc/GMT+8';
bonusRule.dayOfWeek = [0, 6];
//50 12 * * *
const bonusExpeds = schedule.scheduleJob(bonusRule, function () {
    message("Bonus Expeditions");
});

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag} v4!`);

    fortRace.schedule();
    morningExpeds.schedule();
    eveningExpeds.schedule();
    bonusExpeds.schedule();
    // message("Morning Expeditions");
    // client.channels.cache.get('783513086429888515').send("hi")
});

let infoMap = new Map([
    ['.buffs', 'https://media.discordapp.net/attachments/790451126956064778/796177528129060894/unknown.png']
]);

client.on('message', message => {

    if (message.content.startsWith('.calc')) {
        let str = message.content.split(" ");

        let serverTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT+8"}));
        // hours as (HH) format
        let hours = ("0" + serverTime.getHours()).slice(-2);
        // minutes as (mm) format
        let minutes = ("0" + serverTime.getMinutes()).slice(-2);

        let timeStr = str[1].split(":");
        let inputHour = Number(timeStr[0]);
        let inputMin = Number(timeStr[1]);

        let timeStart = Number(hours*60) + Number(minutes);
        let timeEnd = inputHour*60 + inputMin;
        console.log(timeStart + " and " + timeEnd);
        let difference = timeEnd - timeStart;

        if (difference < 0) {
            difference = 24*60 + difference;
        }

        return message.channel.send("<@" + message.author + ">, You will need to load " + difference + " minutes of AB");
    }

    if (message.content === '!edicount') {
        return message.channel.send(`Serving ${client.guilds.cache.size} servers`);
    }

    let guildNames = [];
    if (message.content === '!ediservers') {
        client.guilds.cache.forEach(guild => {
            guildNames.push(`${guild.name} | ${guild.id}`);
        })
        return message.channel.send(guildNames);
    }

    if (message.content === '!invite') {
        return message.channel.send(`https://discord.com/oauth2/authorize?client_id=805522695708999723&scope=bot`);
    }

    if (message.content === ".help") {
        try {
            return message.channel.send("List of Commands", {
                embed: {
                    color: "#ff7b00",
                    fields: [
                        {
                            name: 'AB Calculator', value: '.calc 00:00'
                        },
                        {
                            name: 'Buff List', value: '.buffs'
                        }
                    ]
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    if (infoMap.has(message.content)) {
        let attachment = new Discord.MessageAttachment(infoMap.get(message.content));
        try {
            return message.channel.send(attachment);
        } catch (err) {
            console.error(err);
        }
    }

    if (message.content === ".mock") {
        let channel = message.channel; // <-- your pre-filled channel variable

        channel.messages
            .fetch({limit: 2})
            .then((messages) => {
                let lastMessage = messages.last();

                if (!lastMessage.author.bot) {
                    // The author of the last message wasn't a bot
                    return message.channel.send(
                        firstLetterUppercase(lastMessage.content)
                    );
                }
            })
            .catch(console.error);
    }
    // client.channels.cache.get('783513086429888515').send("hi")
});

function message(exped) {
    const signedMembers = new Map();
    const signedNames = new Map();

    const titleName = {'OnTime': 'On Time', '152': 'Fifteen', '302': 'Thirty', '452': 'Fourty-Five', 'Skip': 'Skip'};
    let editBool = true;

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
            let userArray = [];
            let userIds = [];

            if (user.id !== '805522695708999723') {
                let name = null;
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
            let userArray = [];
            let userIds = [];

            if (user.id !== '805522695708999723') {
                let name = null;
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
            let max;
            let maxCount;
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

function fortAnnounce(title) {
    const embed = {
        title: title,
        description: "@here It's time for Guild Fort Race! Please log on and help us get this dub!",
        color: '#FFA500'
    };

    client.channels.cache.get('519774750680154123').send("@here", {embed: embed});
    client.channels.cache.get('472829227159257099').send("@here", {embed: embed});

}

function alertExpeds(signedMembers, time) {
    let members = "";
    for (let i = 0; i < signedMembers.get(time).length; i++) {
        members += "<@" + signedMembers.get(time)[i] + ">  ";
    }
    client.channels.cache.get('811435136615972891').send("@here " + "Please log on now! <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">")
}

function firstLetterUppercase(input) {
    let res = "";
    for (let i = 0; i < input.length; i++) {
        res += i % 2 === 0 ? input.charAt(i).toUpperCase() : input.charAt(i);
    }
    return res;
}
