const fs = require('fs');

module.exports = {
    category: 'Reminders',
    callback: ({ message }) => {
        const content = message.content;

        let str = content.split(" ");

        let rawData = fs.readFileSync('movies.json',
            {encoding:'utf8', flag:'r'});
        let myArray = JSON.parse(rawData);

        if (str[1] === 'add') {
            if (str[2] === undefined) return message.reply('Please add movie title')
            let movieTitle = content.substr(12);
            myArray.push(movieTitle)
        } else if (str[1] === 'rm') {
            if (str[2] === undefined) return message.reply('Please select the movie number to delete')
            if (isNaN(Number(str[2]))) return message.reply("Not a Number");
            myArray.splice(Number(str[2]) - 1, 1);
        }

        let output = '__**Movie List**__\n';
        for (let i = 0; i < myArray.length; i++) {
            output += (i+1) + '. ' + myArray[i] + '\n';
        }

        const data = JSON.stringify(myArray)
        fs.writeFileSync('movies.json', data);

        return message.channel.send(output);
    },
    error: ({ error, command, message, info }) => {
        message.channel.send("Error")
    }
}
