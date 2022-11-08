const { MessageAttachment } = require("discord.js")

module.exports = {
    info: function (message, infoMap) {
        console.log(message.content.toLowerCase())
        let item = infoMap.get(message.content.toLowerCase());
        let output;

        if (item.type === 'image') {
            output = {files: [{attachment: item.img}]};
        }
        else if (item.type === 'embed') {
            output = {embeds: [item.embed]};
        }

        try {
            return message.channel.send(output);
        } catch (err) {
            console.error(err);
        }
    }
}
