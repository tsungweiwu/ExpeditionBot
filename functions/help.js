module.exports = {
    helpInfo: function(message) {
        try {
            return message.channel.send("List of Commands", {
                embed: {
                    color: "#ff7b00",
                    fields: [
                        {
                            name: 'AB Calculator', value: '.calc 00:00'
                        },
                        {
                            name: 'Commander Bosses', value: '.hilla\n.vonleon', inline: true
                        },
                        {
                            name: 'Root Abyss Bosses', value: '.vellum\n.queen\n.pierre\n.vonbon', inline: true
                        },
                        {
                            name: 'Regular Bosses', value: '.cygnus\n.pinkbean\n.horntail\n.zakum', inline: true
                        },
                        {
                            name: 'Buff List', value: '.buffs', inline: true
                        },
                        {
                            name: 'Potential Cube', value: '.cubes', inline: true
                        },
                        {
                            name: 'Flame Options', value: '.flames', inline: true
                        },
                        {
                            name: 'Stats Cap/Max %', value: '.statcap', inline: true
                        },
                        {
                            name: 'Hyper Stats', value: '.hyper', inline: true
                        }
                    ]
                },
            });
        } catch (err) {
            console.error(err);
        }
    }
}
