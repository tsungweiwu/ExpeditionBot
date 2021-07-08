const fs = require('fs');

module.exports = {
    category: 'Reminders',
    callback: ({ message }) => {
        const content = message.content;

        let str = content.split(" ");

        let rawData = fs.readFileSync('restaurants.json',
            {encoding:'utf8', flag:'r'});
        let myArray = JSON.parse(rawData);

        if (str[1] === 'add') {
            if (str[2] === undefined) return message.reply('Please add restaurant name')
            let restaurantTitle = content.substr(10) + ' - ' + message.author.tag;
            myArray.push(restaurantTitle)
        } else if (str[1] === 'rm') {
            if (str[2] === undefined) return message.reply('Please select the restaurant number to delete')
            if (isNaN(Number(str[2]))) return message.reply("Not a Number");
            myArray.splice(Number(str[2]) - 1, 1);
        }
        let output = '__**Restaurant List**__\n';
        for (let i = 0; i < myArray.length; i++) {
            output += (i+1) + '. ' + myArray[i] + '\n';
        }

        const data = JSON.stringify(myArray)
        fs.writeFileSync('restaurants.json', data);

        return message.channel.send(output);
    },
    error: ({ error, command, message, info }) => {
        message.channel.send(error)
    }
}
