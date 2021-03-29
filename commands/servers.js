module.exports = {
    category: 'Owner',
    ownerOnly: true,
    callback: ({ client, message }) => {
        let guildNames = [];

        client.guilds.cache.forEach(guild => {
            guildNames.push(`${guild.name} | ${guild.id}`);
        })
        return message.channel.send(guildNames);
    }
}
