const request = require("request");

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        request({
            url: "https://complimentr.com/api",
            json: true
        }, (err, response, body) => {
            if (!message.author.bot) {
                // The author of the last message wasn't a bot
                return channel.send(body.compliment);
            }
        });
    }
}
