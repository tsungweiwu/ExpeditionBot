const ud = require('urban-dictionary')

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable
        let phrase = message.content.substr(4);
        let string = '';

        ud.define(phrase, (error, results) => {
            if (error) {
                console.error(`define (callback) error - ${error.message}`)
                return channel.send(error.message);
            }

            return channel.send({
                embed: {
                    title: '__**Definition**__:',
                    description: results[0].permalink,
                    footer: {
                        text: results[0].definition
                    }
                }
            });
        })
    }
}
