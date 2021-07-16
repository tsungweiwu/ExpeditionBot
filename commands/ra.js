const schedule = require('node-schedule')
let rootAbyss = require('../features/bossRunAnnouncement');
const fs = require('fs');

module.exports = {
    category: 'Signup',
    callback: ({ message, client }) => {
        let rawData = fs.readFileSync('guildConfig.json',
            {encoding:'utf8', flag:'r'});
        const jsonObject = JSON.parse(rawData);
        let guildConfig = new Map(Object.entries(jsonObject));

        if (guildConfig.get(message.guild.id).raChannelId === "") return message.reply('Please configure your RA channel');
        if (guildConfig.get(message.guild.id).spamChannelId !== "" && message.channel.id !== guildConfig.get(message.guild.id).spamChannelId) return message.reply('Wrong Channel!');

        let str = message.content.split(" ");
        if (str[1] === 'cancel') {
            let temp = guildConfig.get(message.guild.id);
            let map = {};

            temp.job1 = {};
            guildConfig.set(message.guild.id, temp);

            guildConfig.forEach(function(value, key){
                map[key] = value
            });

            let data = JSON.stringify(map, null, 4);
            fs.writeFileSync('guildConfig.json', data);
            return message.reply('successfully cancelled');
        }

        if (str.length > 2) return message.reply('wrong input');

        if (Object.entries(guildConfig.get(message.guild.id).job1).length !== 0) return message.reply('There is currently a signup sheet');

        const author = message.author;

        const filter = m => m.author.id === author.id;
        let title;
        let description;
        let hour = 0;
        let minute = 0;

        message.reply("Please enter a **title**.. Will expire in **20** seconds..");
        message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
            if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                return message.reply("Canceled!");
            }
            title = collected.first().content;

            message.reply("Please enter a **description**.. Will expire in **20** seconds..");
            message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }
                description = collected.first().content;

                message.reply("Please enter a **Start Time (MSM Server Time, 24hr format)**.. Will expire in **20** seconds..");
                message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
                    if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                        return message.reply("Canceled!");
                    }
                    let timeOfDay = '';
                    let timeZone = '';
                    let info = collected.first().content.split(" ");
                    let time = info[0].split(":");
                    hour = Number(time[0]);
                    minute = Number(time[1]);

                    if (hour > 23 || hour < 0 || minute < 0 || minute > 60) return message.reply("Invalid Input");

                    if (info.length >= 2) {
                        if (info[1].toLowerCase() === 'am' || info[1].toLowerCase() === 'pm') {
                            timeOfDay = info[1];
                        }
                    }

                    if (info.length > 2 && info.length <= 3) {
                        if (info[2].toLowerCase() === 'et' || info[2].toLowerCase() === 'pt') {
                            timeZone = info[2];
                        }
                    }

                    message.reply("Confirm if **" + time[0] + ":" + time[1] + " "  + timeOfDay + " " + timeZone + "** is correct __(type yes or y to confirm)__.. Will expire in **20** seconds..");
                    message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
                        if (collected.first().content.toLowerCase() === 'yes' || collected.first().content.toLowerCase() === 'y') {
                            message.reply("You have successfully scheduled the run");
                            rootAbyss.message(title, description, hour, minute, timeOfDay, timeZone, client, guildConfig.get(message.guild.id));
                        }
                        else {
                            return message.reply("Canceled!");
                        }

                    }).catch(error => {
                        message.reply("Creation time expired");
                    })


                }).catch(error => {
                    message.reply("Creation time expired");
                })

            }).catch(error => {
                message.reply("Creation time expired");
            })

        }).catch(error => {
            message.reply("Creation time expired");
        })


    },
    error: ({ error, command, message, info, client }) => {
        message.channel.send("Your server has not been configured yet. Please contact admin!")
    }
}
