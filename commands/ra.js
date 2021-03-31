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

        if (str.length >= 2) return message.reply('wrong input');

        if (Object.entries(guildConfig.get(message.guild.id).job1).length !== 0) return message.reply('There is currently a signup sheet');

        const author = message.author;

        const filter = m => m.author.id === author.id;
        let title;
        let description;
        let hour;
        let minute;

        message.reply("Please enter a **title**.. Will expire in **10** seconds..");
        message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
            if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                return message.reply("Canceled!");
            }
            title = collected.first().content;

            message.reply("Please enter a **description**.. Will expire in **10** seconds..");
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }
                description = collected.first().content;

                message.reply("Please enter a **Start Time (MSM Server Time, 24hr format)**.. Will expire in **20** seconds..");
                message.channel.awaitMessages(filter, {max: 1, time: 20000}).then(collected => {
                    if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                        return message.reply("Canceled!");
                    }
                    let time = collected.first().content.split(":");
                    hour = Number(time[0]);
                    minute = Number(time[1]);

                    if (hour > 23 || hour < 0 || minute < 0 || minute > 60) return message.reply("Invalid Input");

                    message.reply("Confirm if **" + hour + ":" + minute + "** is correct __(type yes or y to confirm)__.. Will expire in **10** seconds..");
                    message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                        if (collected.first().content.toLowerCase() === 'yes' || collected.first().content.toLowerCase() === 'y') {
                            message.reply("You have successfully scheduled the run");
                            rootAbyss.message(title, description, hour, minute, client, guildConfig.get(message.guild.id));
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
