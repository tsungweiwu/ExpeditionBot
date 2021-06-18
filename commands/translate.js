const translate = require('@iamtraction/google-translate');

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        if (message.reference !== null) {
            channel.messages.fetch(message.reference.messageID).then(msg => {
                console.log(msg.content)

                translate(msg.content, {to: 'en'}).then(res => {
                    return channel.send(res.text);
                }).catch(err => {
                    return channel.send(err);
                })
            })
        } else {
            let msg = message.content.substr(11);

            translate(msg, {to: 'en'}).then(res => {
                return channel.send(res.text);
            }).catch(err => {
                return channel.send(err);
            })
        }
    }
}
