const request = require("request");

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable
        let string = message.content.split(" ")
        let word = string[1];

        request({
            url: `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
            json: true
        }, (err, response, body) => {
            if (!message.author.bot) {
                // The author of the last message wasn't a bot\
                if (body.title !== undefined) return channel.send(body.message);
                let definitions = [];
                body.map(words => {
                    words.meanings.map(meaning => {
                        meaning.definitions.map(def => {
                            definitions += '* ' + def.definition + '\n';
                        })
                    })
                })
                return channel.send({
                    embed: {
                        title: 'Word: ' + word,
                        description: "**Definition**: \n" + definitions,
                    }
                });
            }
        });
    }
}
