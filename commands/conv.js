module.exports = {
    category: 'Misc',
    callback: ({ message }) => {
        let str = message.content.split(" ");
        let deg = str[1];
        let temperature = Number(str[2]);

        if (!isNaN(temperature) && !message.author.bot) {
            if (deg === 'f') {
                let convertedTemp = (temperature * 9/5) + 32;
                return message.channel.send(temperature + ' c = ' + convertedTemp + ' f');
            }
            else if (deg === 'c') {
                let convertedTemp = (temperature - 32) * 5/9;
                return message.channel.send(temperature + ' f = ' + convertedTemp + ' c');
            }
            else return message.channel.send('wrong input');
        }
    }
}
