const request = require("request");

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        request({
            url: "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit",
            json: true
        }, (err, response, body) => {
            if (!message.author.bot) {
                // The author of the last message wasn't a bot
                if (body.joke !== undefined) return channel.send(body.joke);
                else return channel.send(body.setup + '\n||' + body.delivery + '||');
            }
        });
    }
}
