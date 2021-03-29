module.exports = {
    category: 'Owner',
    ownerOnly: true,
    callback: ({ message }) => {
        return message.channel.send(`Guild:  ${message.guild.name} | ${message.guild.id}`);
    }
}
