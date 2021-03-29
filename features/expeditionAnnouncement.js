const schedule = require('node-schedule')
const guilds = require('../guildConfig');

module.exports = {
    message: function (title, client, config) {
        const titleName = {'✅': 'Attending', '❌': 'Not Attending', '❓': 'Tentative'};
        let editBool = true;
        let signedNames = new Map();

        const embed = {
            title: title,
            description: "It's time for expeds, Please react to whether you can show up",
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

        client.channels.cache.get(config.channelId).send(`<@&${config.mentions}>`, {embed: embed}).then(function (message) {
            message.react('✅').then(
                message.react('❌')).then(
                message.react('❓')).catch()

            /**
             * ADD REACTION METHOD
             */
            client.on('messageReactionAdd', (reaction, user) => {
                if (user.bot) return;
                if (!reaction.message.guild) return;

                if (reaction.message.channel.id === config.channelId) {
                    let num;
                    if (reaction.emoji.name === '✅') {
                        num = 0;
                    } else if (reaction.emoji.name === '❌') {
                        num = 1;
                    } else if (reaction.emoji.name === '❓') {
                        num = 2;
                    }

                    let userArray = [];

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

                            signedNames.set(reaction.emoji.name, userArray);
                        } else {
                            userArray.push(name);
                            signedNames.set(reaction.emoji.name, userArray);
                        }

                        console.log(signedNames);
                    }


                    embed.fields[num].name = reaction.emoji.name + " " + titleName[reaction.emoji.name] + " (" + userArray.length + "/10)";
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

                if (reaction.message.channel.id === config.channelId) {
                    let userArray = [];

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

                            const index = userArray.indexOf(name);
                            if (index > -1) {
                                userArray.splice(index, 1);
                            }
                            signedNames.set(reaction.emoji.name, userArray);
                        }
                    }

                    let num;
                    if (reaction.emoji.name === '✅') {
                        num = 0;
                    } else if (reaction.emoji.name === '❌') {
                        num = 1;
                    } else if (reaction.emoji.name === '❓') {
                        num = 2;
                    }

                    embed.fields[num].name = reaction.emoji.name + " " + titleName[reaction.emoji.name] + " (" + userArray.length + "/10)";
                    embed.fields[num].value = userArray.join("\n");
                    if (embed.fields[num].value === "") {
                        embed.fields[num].value = "-\n";
                    }
                    if (editBool) {
                        message.edit({embed: embed});
                    }
                    console.log(signedNames);
                }
            })

            message.awaitReactions((reaction, user) => user.id === message.author.id, {time: (14 * 60000)}).then(collected => {
                editBool = false;
            })
        }).catch(function () {
            console.log("failed")
        })

    }
}