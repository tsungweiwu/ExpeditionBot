const translate = require('@iamtraction/google-translate');

module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        let msg = message.content.substr(11);

        translate(msg, {to: 'en'}).then(res => {
            return channel.send(res.text);
        }).catch(err => {
            return channel.send(err);
        })
    }
}
