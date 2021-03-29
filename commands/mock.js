module.exports = {
    category: 'Fun',
    callback: ({ message }) => {
        let channel = message.channel; // <-- your pre-filled channel variable

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

function firstLetterUppercase(input) {
    let res = "";
    for (let i = 0; i < input.length; i++) {
        res += i % 2 === 0 ? input.charAt(i).toUpperCase() : input.charAt(i);
    }
    return res;
}
