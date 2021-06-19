const request = require("request");

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        request({
            url: "https://evilinsult.com/generate_insult.php?lang=en&amp;type=json",
            json: true
        }, (err, response, body) => {
            if (message.content.includes('156232419219996672')) {
                return channel.send('I shall not disrespect my creator <3')
            }

            if (!message.author.bot) {
                // The author of the last message wasn't a bot
                return channel.send(body);
            }
        });
    }
}
