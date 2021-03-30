module.exports = {
    category: 'Guides',
    callback: ({ message }) => {
        const targetChannel = message.channel;

        let serverTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT+8"}));
        // hours as (HH) format
        let hours = ("0" + serverTime.getHours()).slice(-2);
        // minutes as (mm) format
        let minutes = ("0" + serverTime.getMinutes()).slice(-2);

        targetChannel.send("It is now **" + hours + ":" + minutes + "** server time");
    },
    error: ({ error, command, message, info }) => {
        message.channel.send("Incorrect input!")
    }
}
