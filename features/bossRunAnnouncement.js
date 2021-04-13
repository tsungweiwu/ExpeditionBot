const schedule = require('node-schedule')

const fs = require('fs');

module.exports = {
    message: function (title, description, hour, minute, client, config) {
        if (config.raChannelId === "") return;
        if (client.channels.cache.get(config.raChannelId) === undefined) return;

        const titleName = {'✅': 'Attending', '❌': 'Not Attending', '❓': 'Tentative'};
        let editBool = true;
        const signedMembers = new Map();
        let signedNames = new Map();
        const emojis = ['✅', '❌', '❓'];

        let timeStr = hour >= 13 ? `${hour-12}:${minute} pm (GMT+8)` : `${hour}:${minute} am (GMT+8)`;

        const embed = {
            title: title,
            description: description,
            fields: [
                {
                    name: "**Time**",
                    value: timeStr
                },
                {
                    name: "✅ Attending (0/5)",
                    value: "-\n",
                    inline: true
                },
                {
                    name: "❌ Not Attending (0/5)",
                    value: "-\n",
                    inline: true
                },
                {
                    name: "❓ Tentative (0/5)",
                    value: "-\n",
                    inline: true
                }
            ],
            color: '#FFA500'
        };

        client.channels.cache.get(config.raChannelId).send({embed: embed}).then(function (message) {
            message.react('✅').then(
                message.react('❌')).then(
                message.react('❓')).catch()

            /**
             * ADD REACTION METHOD
             */
            client.on('messageReactionAdd', (reaction, user) => {
                console.log('entered reaction')
                if (user.bot) return;
                if (!reaction.message.guild) return;
                if (!emojis.includes(reaction.emoji.name)) return;
                console.log('passed reaction')

                if (reaction.message.channel.id === config.raChannelId) {
                    let num;
                    if (reaction.emoji.name === '✅') {
                        num = 1;
                    } else if (reaction.emoji.name === '❌') {
                        num = 2;
                    } else if (reaction.emoji.name === '❓') {
                        num = 3;
                    }

                    let userArray = [];
                    let userIds = [];

                    if (user.id !== client.user.id) {
                        let name;
                        try {
                            if (message.guild.members.cache.get(user.id).nickname === null) {
                                name = user.username;
                            } else {
                                name = message.guild.members.cache.get(user.id).nickname;
                            }
                        } catch (error) {
                            name = user.username;
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


                    embed.fields[num].name = reaction.emoji.name + " " + titleName[reaction.emoji.name] + " (" + userArray.length + "/5)";
                    embed.fields[num].value = userArray.join("\n");
                    if (embed.fields[num].value === "") {
                        embed.fields[num].value = "-\n";
                    }
                    if (editBool) {
                        message.edit({embed: embed});
                    }
                }
            })


            /**
             * REMOVE REACTION METHOD
             */

            client.on('messageReactionRemove', (reaction, user) => {
                if (user.bot) return;
                if (!reaction.message.guild) return;
                if (!emojis.includes(reaction.emoji.name)) return;

                if (reaction.message.channel.id === config.raChannelId) {
                    let userArray = [];
                    let userIds = [];

                    if (user.id !== client.user.id) {
                        let name;
                        try {
                            if (message.guild.members.cache.get(user.id).nickname === null) {
                                name = user.username;
                            } else {
                                name = message.guild.members.cache.get(user.id).nickname;
                            }
                        } catch (error) {
                            name = user.username;
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

                    let num;
                    if (reaction.emoji.name === '✅') {
                        num = 1;
                    } else if (reaction.emoji.name === '❌') {
                        num = 2;
                    } else if (reaction.emoji.name === '❓') {
                        num = 3;
                    }

                    embed.fields[num].name = reaction.emoji.name + " " + titleName[reaction.emoji.name] + " (" + userArray.length + "/5)";
                    embed.fields[num].value = userArray.join("\n");
                    if (embed.fields[num].value === "") {
                        embed.fields[num].value = "-\n";
                    }
                    if (editBool) {
                        message.edit({embed: embed});
                        signedMembers.set(reaction.emoji.name, userIds);
                    }
                    console.log(signedNames);
                    console.log(signedMembers);
                }
            })

            // let runTime = hour*60 + minute;
            // let serverTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT+8"}));
            // // hours as (HH) format
            // let currHour = ("0" + serverTime.getHours()).slice(-2);
            // // minutes as (mm) format
            // let currMin = ("0" + serverTime.getMinutes()).slice(-2);
            // let currTime = Number(currHour*60) + Number(currMin);
            //
            // let diffTime = runTime - currTime;

            let rawData = fs.readFileSync('guildConfig.json',
                {encoding:'utf8', flag:'r'});
            const jsonObject = JSON.parse(rawData);
            let guildConfig = new Map(Object.entries(jsonObject));

            let temp = guildConfig.get(message.guild.id);
            let map = {};
            let data;

            const rule = new schedule.RecurrenceRule();
            rule.hour = hour;
            rule.minute = minute;
            rule.tz = 'Etc/GMT+8';
            //50 12 * * *
            const bossRun = schedule.scheduleJob(rule, function () {
                schedule.cancelJob(bossRun);

                let rawData2 = fs.readFileSync('guildConfig.json',
                    {encoding:'utf8', flag:'r'});
                const jsonObject2 = JSON.parse(rawData2);
                let guildConfig2 = new Map(Object.entries(jsonObject2));

                let temp = guildConfig2.get(message.guild.id);

                // if it was empty or cancelled
                if (Object.entries(temp.job1).length === 0) return console.log('cancelled');

                temp.job1 = {};
                guildConfig2.set(message.guild.id, temp);

                guildConfig2.forEach(function(value, key){
                    map[key] = value
                });

                data = JSON.stringify(map, null, 4);
                fs.writeFileSync('guildConfig.json', data);

                editBool = false;
                let memberStr = "";
                signedMembers.forEach((value, key) => {
                    if (key === '✅') {
                        value.forEach(id => memberStr += "<@" + id + "> ")
                    }
                })
                client.channels.cache.get(config.raChannelId).send(memberStr + "\nIt's time to get on!");
            });

            bossRun.schedule();

            temp.job1 = bossRun;
            guildConfig.set(message.guild.id, temp);

            guildConfig.forEach(function(value, key){
                map[key] = value
            });

            data = JSON.stringify(map, null, 4);
            fs.writeFileSync('guildConfig.json', data);

        }).catch(function () {
            console.log("failed")
        })

    }
}
