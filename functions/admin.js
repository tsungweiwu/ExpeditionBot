module.exports = {
    data: function(message, client) {
        if (message.content === '.count') {
            return message.channel.send(`Serving ${client.guilds.cache.size} servers`);
        }

        if (message.content === '.id') {
            return message.channel.send(`Guild:  ${message.guild.name} | ${message.guild.id}`);
        }

        let guildNames = [];
        if (message.content === '.servers') {
            client.guilds.cache.forEach(guild => {
                guildNames.push(`${guild.name} | ${guild.id}`);
            })
            return message.channel.send(guildNames);
        }
    }
}
