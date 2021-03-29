const schedule = require('node-schedule')

module.exports = {
    message: function (title, client) {
        const signedMembers = new Map();
        const signedNames = new Map();

        const titleName = {'OnTime': 'On Time', '152': 'Fifteen', '302': 'Thirty', '452': 'Fourty-Five', 'Skip': 'Skip'};
        let editBool = true;

        const embed = {
            title: title,
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
                            alertExpeds(signedMembers, 'OnTime', client)
                            schedule.cancelJob('alert-job')
                        })
                        break;
                    }

                    case '152': {
                        console.log("entered on 15")
                        client.channels.cache.get('811435136615972891').send("Majority voted for :15 with a total of " + maxCount + " votes");
                        schedule.scheduleJob('alert-job', '15 * * * *', function() {
                            alertExpeds(signedMembers, '152', client)
                            schedule.cancelJob('alert-job')
                        })
                        break;
                    }

                    case '302': {
                        console.log("entered on 30")
                        client.channels.cache.get('811435136615972891').send("Majority voted for :30 with a total of " + maxCount + " votes");
                        schedule.scheduleJob('alert-job', '30 * * * *', function() {
                            alertExpeds(signedMembers, '302', client)
                            schedule.cancelJob('alert-job')
                        })
                        break;
                    }

                    case '452': {
                        console.log("entered on 45")
                        client.channels.cache.get('811435136615972891').send("Majority voted for :45 with a total of " + maxCount + " votes");
                        schedule.scheduleJob('alert-job', '45 * * * *', function() {
                            alertExpeds(signedMembers, '452', client)
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
}

// private function
function alertExpeds(signedMembers, time, client) {
    let members = "";
    for (let i = 0; i < signedMembers.get(time).length; i++) {
        members += "<@" + signedMembers.get(time)[i] + ">  ";
    }
    client.channels.cache.get('811435136615972891').send("@here " + "Please log on now! <:MMDino:" + client.emojis.cache.find(emoji => emoji.name === "MMDino") + ">")
}
