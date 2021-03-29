module.exports = {
    category: 'Owner',
    ownerOnly: true,
    callback: ({ client, message }) => {
        return message.channel.send(`Serving ${client.guilds.cache.size} servers`);
    }
}
