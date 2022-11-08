module.exports = {
    callback: ({ message, instance }) => {
        // instance.commandHandler.commands.forEach((command) => {
        //     if (command.category !== 'Owner' && command.category !== 'Configuration')
        //         console.log(command)
        // })
        return message.channel.send({
            embeds: [
                {
                    title: "__List of Commands__",
                    thumbnail: {
                        url: "https://lh3.googleusercontent.com/RX46lC-_Co8CYqp9Z9eSddIQpuifBnZl3oeIskq_cdse34H9ujnYv0spvRGJZZ7U7dwuRg=s85",
                    },
                    fields: [
                        {
                            name: ':lion_face: Commander', value: '`.magnus` `.hilla` `.vonleon`', inline: true
                        },
                        {
                            name: ':chicken: Root Abyss', value: '`.vellum` `.queen` `.pierre` `.vonbon`', inline: true
                        },
                        {
                            name: ':dragon_face: Regular', value: '`.cygnus` `.pinkbean` `.horntail` `.zakum`', inline: true
                        },
                        {
                            name: ':notebook_with_decorative_cover: Guides', value: '`.buffs` `.pabuffs` `.mabuffs` `.cubes` `.flames` `.statcap` `.gear` `.sf` `.hyper` `.soul` `.pba` `.pba2` `.link` `.culvert`', inline: true
                        },
                        {
                            name: ':watch: Get Current Server Time', value: '`.time`', inline: true
                        },
                        {
                            name: ':video_game: Fun', value: '`.nexon` `.ask` `.roast` `.compliment` `.qod` `.tr` `.tt`', inline: true
                        },
                        {
                            name: ':timer: AB Calculator', value: '`.calc 00:00` `.calcA 00:00` `.calcEU 00:00`', inline: true
                        },
                    ]
                }
            ]
        })
    }
}
