module.exports = {
    fortAnnounce: function (title, client, config) {
        client.channels.cache.get(config.fortChannelId).send('**' + title + '**\n' + (config.mentions !== '' ? `<@&${config.mentions}>` : '') + 'It\'s time for Guild Fort Race! Please log on and help us get this dub!');
    }
}
