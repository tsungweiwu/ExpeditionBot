const request = require("request");

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        request({
            url: "http://jservice.io/api/random",
            json: true
        }, (err, response, body) => {
            if (!message.author.bot) {
                // The author of the last message wasn't a bot
                return channel.send(body[0].question + '\n||' + body[0].answer + '||\n' + 'Category: ' + body[0].category.title);
            }
        });
    }
}
