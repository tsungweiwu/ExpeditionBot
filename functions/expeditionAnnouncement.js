const schedule = require('node-schedule')
const guilds = require('../guildConfig');

module.exports = {
    message: function (title, client) {
        Object.entries(guilds).forEach(([key, value]) =>  {
            const signedMembers = new Map();
            const signedNames = new Map();

            const titleName = {'✅': 'Attending', '❌': 'Not Attending', '❓': 'Tentative'};
            let editBool = true;

            const embed = {
                title: title,
                description: "@here It's time for expeds, Please react to whether you can show up",
                fields: [
                    {
                        name: "✅ Attending (0/10)",
                        value: "-\n",
                        inline: true
                    },
                    {
                        name: "❌ Not Attending (0/10)",
                        value: "-\n",
                        inline: true
                    },
                    {
                        name: "❓ Tentative (0/10)",
                        value: "-\n",
                        inline: true
                    }
                ],
                color: '#FFA500'
            };

            client.channels.cache.get(value.channel).send("test", {embed: embed}).then(function(message) {
                message.react('✅').then(
                    message.react('❌')).then(
                    message.react('❓')).catch()

                /**
                 * ADD REACTION METHOD
                 */
                client.on('messageReactionAdd', (reaction, user) => {
                    let userArray = [];
                    let userIds = [];

                    if (user.id !== client.user.id) {
                        let name;
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
                    if (reaction.emoji.name === '✅') {
                        num = 0;
                    } else if (reaction.emoji.name === '❌') {
                        num = 1;
                    } else if (reaction.emoji.name === '❓') {
                        num = 2;
                    }

                    embed.fields[num].name = reaction.emoji.name  + " " + titleName[reaction.emoji.name] + " (" + userArray.length +"/10)";
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

                    if (user.id !== client.user.id) {
                        let name;
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
                    if (reaction.emoji.name === '✅') {
                        num = 0;
                    } else if (reaction.emoji.name === '❌') {
                        num = 1;
                    } else if (reaction.emoji.name === '❓') {
                        num = 2;
                    }

                    embed.fields[num].name = reaction.emoji.name  + " " + titleName[reaction.emoji.name] + " (" + userArray.length +"/10)";
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
                    editBool = false;
                })
            }).catch(function() {
                console.log("failed")
            })
        })
    }
}
