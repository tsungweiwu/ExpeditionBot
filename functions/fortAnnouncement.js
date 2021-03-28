module.exports = {
    fortAnnounce: function (title, client) {
        const embed = {
            title: title,
            description: "@here It's time for Guild Fort Race! Please log on and help us get this dub!",
            color: '#FFA500'
        };

        client.channels.cache.get('519774750680154123').send("@here", {embed: embed});
        client.channels.cache.get('472829227159257099').send("@here", {embed: embed});

    }
}
