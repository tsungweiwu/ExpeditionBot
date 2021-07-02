module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

        if (message.reference !== null) {
            channel.messages.fetch(message.reference.messageID).then(msg => {
                if (!msg.author.bot) {
                    // The author of the last message wasn't a bot
                    return message.channel.send(
                        firstLetterUppercase(msg.content)
                        );
                }
            })
        } else {
            channel.messages
                .fetch({limit: 2})
                .then((messages) => {
                    let lastMessage = messages.last();

                    if (!lastMessage.author.bot) {
                        // The author of the last message wasn't a bot
                        return message.channel.send(
                            firstLetterUppercase(lastMessage.content)
                            );
                    }
                })
                .catch(console.error);
        }
    }
}

const isUpperCase = char => char.charCodeAt(0) >= 65 && char.charCodeAt(0)<= 90;
const isLowerCase = char => char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122;

function firstLetterUppercase(input) {
    let res = "";
    for (let i = 0; i < input.length; i++) {
        if (i % 2 === 0) {
            res += isUpperCase(input.charAt(i)) ? input.charAt(i) : input.charAt(i).toUpperCase();
        } else {
            res += isLowerCase(input.charAt(i)) ? input.charAt(i) : input.charAt(i).toLowerCase();
        }
    }
    return res;
}
