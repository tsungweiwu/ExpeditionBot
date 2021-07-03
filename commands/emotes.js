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
                            name: ':smile: Emojis', value: '`.nexon` `.nya` `.catroll` `.cowroll` `.llamaroll` `.hamroll` `.s1` `.s2` ' +
                                '`.wiggle` `.wiggle2` `.slap` `.wut` `.randy` `.kick` `.run` `.flop` `.pole` `.shoot`', inline: true
                        },
                    ]
                },
            });
        } catch (err) {
            console.error(err);
        }
    }
}
