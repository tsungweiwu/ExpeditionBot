const ud = require('urban-dictionary')

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable
        let phrase = message.content.substr(3);
        let string = '';

        ud.define(phrase, (error, results) => {
            if (error) {
                console.error(`define (callback) error - ${error.message}`)
                return
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

            // Object.entries(results[0]).forEach(([key, prop]) => {
            //     if (key === 'definition') return;
            //     string += key + ': ' + prop + '\n';
            // })
            //
            // return channel.send({
            //     embed: {
            //         title: '__**Definition**__:',
            //         description: string,
            //     }
            // });
        })

        // request({
        //     url: `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`,
        //     json: true
        // }, (err, response, body) => {
        //     if (!message.author.bot) {
        //         // The author of the last message wasn't a bot\
        //         if (body.title !== undefined) return channel.send(body.message);
        //         let definitions = [];
        //         body.map(words => {
        //             words.meanings.map(meaning => {
        //                 meaning.definitions.map(def => {
        //                     definitions += '* ' + def.definition + '\n';
        //                 })
        //             })
        //         })
        //         return channel.send({
        //             embed: {
        //                 title: 'Word: ' + word,
        //                 description: "**Definition**: \n" + definitions,
        //             }
        //         });
        //     }
        // });
    }
}
