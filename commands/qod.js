const request = require("request");

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        request({
            url: "https://quotes.rest/qod.json?category=inspire",
            json: true
        }, (err, response, body) => {
            if (message.content.includes('156232419219996672')) {
                return channel.send('I shall not disrespect my creator <3')
            }

            if (!message.author.bot) {
                // The author of the last message wasn't a bot
                return channel.send({
                    embeds: [{
                        footer: {
                            text: "- " + body.contents.quotes[0].author + ", " + body.contents.quotes[0].date
                        },
                        title: body.contents.quotes[0].title,
                        description: body.contents.quotes[0].quote
                    }]
                });
            }
        });
    }
}
