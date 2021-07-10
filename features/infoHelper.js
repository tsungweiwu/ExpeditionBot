module.exports = {
    info: function (message, infoMap, Discord) {
        let item = infoMap.get(message.content.toLowerCase());
        let output;

        if (item.type === 'image') {
            output = new Discord.MessageAttachment(item.img);
        }
        else if (item.type === 'embed') {
            output = {embed: item.embed};
        }

        try {
            return message.channel.send(output);
        } catch (err) {
            console.error(err);
        }
    }
}
