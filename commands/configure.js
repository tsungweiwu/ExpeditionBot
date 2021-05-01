const schedule = require('node-schedule')
let rootAbyss = require('../features/bossRunAnnouncement');
const fs = require('fs');

module.exports = {
    category: 'Signup',
    callback: ({ message, client }) => {
        if (message.member.id !== '156232419219996672') {
            if (!message.member.roles.cache.some(role => role.name === 'GM')) return message.reply("You need to have the 'GM' role to access this command");
        }

        let str = message.content.split(" ");
        if (str.length < 2) return message.reply({
            embed: {
                color: "#ff7b00",
                title: "__List of configurable options__",
                description: "• Add these commands after `.configure` to edit",
                fields: [
                    {
                        name: 'Expedition Ch.', value: '`expeds`', inline: true
                    },
                    {
                        name: 'Fort Ch.', value: '`fort`', inline: true
                    },
                    {
                        name: 'Root Abyss Ch.', value: '`ra`', inline: true
                    },
                    {
                        name: 'Spam/Bot Cmd Ch.', value: '`spam`', inline: true
                    },
                    {
                        name: 'Mentions/Roles', value: '`mentions`', inline: true
                    },
                ]
            }
        })

        let rawData = fs.readFileSync('guildConfig.json',
            {encoding:'utf8', flag:'r'});
        const jsonObject = JSON.parse(rawData);
        let guildConfig = new Map(Object.entries(jsonObject));

        const filter = m => m.author.id === message.author.id;

        let guildInfo = guildConfig.get(message.guild.id);

        if (str[1] === 'expeds') {
            message.reply("Please enter the **Expedition Channel** (ex: #exped).. Will expire in **10** seconds..\nEnter 'c' or 'cancel' to exit");
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }

                if (collected.first().content.toLowerCase() === 'none') {
                    guildInfo.channelId = '';
                } else {
                    if (!collected.first().content.includes('#')) return message.reply('Wrong Input');
                    guildInfo.channelId = collected.first().content.replace(/\D/g, '');
                }

                guildConfig.set(message.guild.id, guildInfo);
                let map = {};
                guildConfig.forEach(function(value, key){
                    map[key] = value
                });

                let data = JSON.stringify(map, null, 4);
                fs.writeFileSync('guildConfig.json', data);
                return message.reply('successfully configured');

            }).catch(error => {
                message.reply("Creation time expired");
            })
        } else if (str[1] === 'fort') {
            message.reply("Please enter the **Fort Channel** (ex: #fort).. Will expire in **10** seconds..\nEnter 'c' or 'cancel' to exit");
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }

                if (collected.first().content.toLowerCase() === 'none') {
                    guildInfo.fortChannelId = '';
                } else {
                    if (!collected.first().content.includes('#')) return message.reply('Wrong Input');
                    guildInfo.fortChannelId = collected.first().content.replace(/\D/g, '');
                }

                guildConfig.set(message.guild.id, guildInfo);
                let map = {};
                guildConfig.forEach(function(value, key){
                    map[key] = value
                });

                let data = JSON.stringify(map, null, 4);
                fs.writeFileSync('guildConfig.json', data);
                return message.reply('successfully configured');

            }).catch(error => {
                message.reply("Creation time expired");
            })
        } else if (str[1] === 'ra') {
            message.reply("Please enter the **Root Abyss Channel** (ex: #ra).. Will expire in **10** seconds..\nEnter 'c' or 'cancel' to exit");
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }

                if (collected.first().content.toLowerCase() === 'none') {
                    guildInfo.raChannelId = '';
                } else {
                    if (!collected.first().content.includes('#')) return message.reply('Wrong Input');
                    guildInfo.raChannelId = collected.first().content.replace(/\D/g, '');
                }

                guildConfig.set(message.guild.id, guildInfo);
                let map = {};
                guildConfig.forEach(function(value, key){
                    map[key] = value
                });

                let data = JSON.stringify(map, null, 4);
                fs.writeFileSync('guildConfig.json', data);
                return message.reply('successfully configured');

            }).catch(error => {
                message.reply("Creation time expired");
            })
        } else if (str[1] === 'spam') {
            message.reply("Please enter the **Spam/Bot input Channel** (ex: #bot-spam).. Will expire in **10** seconds..\nEnter 'c' or 'cancel' to exit");
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }

                if (collected.first().content.toLowerCase() === 'none') {
                    guildInfo.spamChannelId = '';
                } else {
                    if (!collected.first().content.includes('#')) return message.reply('Wrong Input');
                    guildInfo.spamChannelId = collected.first().content.replace(/\D/g, '');
                }

                guildConfig.set(message.guild.id, guildInfo);
                let map = {};
                guildConfig.forEach(function(value, key){
                    map[key] = value
                });

                let data = JSON.stringify(map, null, 4);
                fs.writeFileSync('guildConfig.json', data);
                return message.reply('successfully configured');

            }).catch(error => {
                message.reply("Creation time expired");
            })
        } else if (str[1] === 'mentions') {
            message.reply("Please enter the **Mention role for announcements** (ex: @mention).. Will expire in **10** seconds..\nEnter 'c' or 'cancel' to exit");
            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {
                if (collected.first().content === 'cancel' || collected.first().content.toLowerCase() === 'c') {
                    return message.reply("Canceled!");
                }

                if (collected.first().content.toLowerCase() === 'none') {
                    guildInfo.mentions = '';
                } else {
                    if (!collected.first().content.includes('@')) return message.reply('Wrong Input');
                    guildInfo.mentions = collected.first().content.replace(/\D/g, '');
                }

                guildConfig.set(message.guild.id, guildInfo);
                let map = {};
                guildConfig.forEach(function(value, key){
                    map[key] = value
                });

                let data = JSON.stringify(map, null, 4);
                fs.writeFileSync('guildConfig.json', data);
                return message.reply('successfully configured');

            }).catch(error => {
                message.reply("Creation time expired");
            })
        } else {
            return message.reply('Not an option..');
        }
        // end of if
    },
    error: ({ error, command, message, info, client }) => {
        message.channel.send("Please contact admin!")
    }
}
