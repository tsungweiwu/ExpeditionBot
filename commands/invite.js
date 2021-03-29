module.exports = {
    category: 'Misc',
    callback: ({ message }) => {
        return message.channel.send('https://discord.com/oauth2/authorize?client_id=805522695708999723&scope=bot');
    }
}
