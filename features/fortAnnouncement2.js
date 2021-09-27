module.exports = {
    fortAnnounce: function (title, client, config) {
        client.channels.cache.get(config.fortChannelId).send('**' + title + '**\n' + (config.fortMention !== '' ? `<@&${config.fortMention}>` : '') + 'Fort Begins in 10 minutes! Get Ready to Log On!!');
    }
}
