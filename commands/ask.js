module.exports = {
    category: 'Guides',
    callback: ({ message }) => {
        let str = message.content.split(" ");
        if (str.length <= 1) return message.channel.send('Are you going to ask me something or not?')

        var randomNumber = Math.random();
        var randomAnswer = Math.floor(randomNumber * magic8Ball.listofanswers.length);
        var answer = magic8Ball.listofanswers[randomAnswer];
        return message.channel.send("🎱 " + answer);
    },
    error: ({ error, command, message, info }) => {
        message.channel.send("Incorrect input! Use .calc 00:00")
    }
}

let magic8Ball = {};
magic8Ball.listofanswers = [
    "It is certain.",
    "It is decidedly so.",
    "Without a doubt.",
    "Yes, definitely.",
    "You may rely on it.",
    "As I see it, yes.",
    "Most likely.",
    "Outlook good.",
    "Yes.",
    "Signs point to yes.",
    "Reply hazy, try again.",
    "Ask again later.",
    "Better not tell you now.",
    "Cannot predict now.",
    "Concentrate and ask again.",
    "Don't count on it.",
    "My reply is no.",
    "My sources say no.",
    "Outlook not so good.",
    "Very doubtful.",
    "Get good first",
    "Ask your mom",
    "Idk.. maybe try Googling it",
    "Ask again when I'm done with your mom",
    "Are you stupid?",
];
