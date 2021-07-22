module.exports = {
    category: 'Misc',
    callback: ({ message }) => {
        const user = message.mentions.users.first() || message.author;
        message.channel.send(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
    }
}
