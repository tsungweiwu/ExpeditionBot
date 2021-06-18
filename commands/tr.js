const tr = require('@iamtraction/google-translate');

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        if (message.reference !== null) {
            channel.messages.fetch(message.reference.messageID).then(msg => {
                tr(msg.content, {to: 'en'}).then(res => {
                    return channel.send(res.text);
                }).catch(err => {
                    return channel.send(err);
                })
            })
        } else {
            let msgArg = message.content.split(" ");
            if (msgArg.length <= 1) return channel.send('Please **include the message to translate after the command** OR **reply a message you wish to translate using this command only**.')

            let msg = message.content.substr(3);

            tr(msg, {to: 'en'}).then(res => {
                return channel.send(res.text);
            }).catch(err => {
                return channel.send(err);
            })
        }
    }
}
