module.exports = {
    callback: ({ message, instance }) => {
        // instance.commandHandler.commands.forEach((command) => {
        //     if (command.category !== 'Owner' && command.category !== 'Configuration')
        //         console.log(command)
        // })
        try {
            return message.channel.send({
                embed: {
                    color: "#ff7b00",
                    title: "__List of Commands__",
                    thumbnail: {
                        url: "https://lh3.googleusercontent.com/RX46lC-_Co8CYqp9Z9eSddIQpuifBnZl3oeIskq_cdse34H9ujnYv0spvRGJZZ7U7dwuRg=s85",
                    },
                    fields: [
                        {
                            name: ':lion_face: Commander', value: '`.hilla` `.vonleon`', inline: true
                        },
                        {
                            name: ':chicken: Root Abyss', value: '`.vellum` `.queen` `.pierre` `.vonbon`', inline: true
                        },
                        {
                            name: ':dragon_face: Regular', value: '`.cygnus` `.pinkbean` `.horntail` `.zakum`', inline: true
                        },
                        {
                            name: ':notebook_with_decorative_cover: Guides', value: '`.buffs` `.cubes` `.flames` `.statcap` `.hyper` `.pba` `.pba2` `.link`', inline: true
                        },
                        {
                            name: ':watch: Get Current Server Time', value: '`.time`', inline: true
                        },
                        {
                            name: ':notepad_spiral: Create RA Signup Sheet', value: '`.ra`', inline: true
                        },
                        {
                            name: ':video_game: Fun', value: '`.nexon` `.ask` `.mock`', inline: true
                        },
                        {
                            name: ':timer: AB Calculator', value: '`.calc 00:00`'
                        },
                    ]
                },
            });
        } catch (err) {
            console.error(err);
        }
    }
}
