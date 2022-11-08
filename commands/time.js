module.exports = {
    category: 'Guides',
    callback: ({ message }) => {
        const targetChannel = message.channel;

        let serverTimeNA = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT+8"}));
        // hours as (HH) format
        let hoursNA = ("0" + serverTimeNA.getHours()).slice(-2);
        // minutes as (mm) format
        let minutesNA = ("0" + serverTimeNA.getMinutes()).slice(-2);

        let serverTimeA = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT-8"}));
        // hours as (HH) format
        let hoursA = ("0" + serverTimeA.getHours()).slice(-2);
        // minutes as (mm) format
        let minutesA = ("0" + serverTimeA.getMinutes()).slice(-2);

        let serverTimeEU = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT-2"}));
        // hours as (HH) format
        let hoursEU = ("0" + serverTimeEU.getHours()).slice(-2);
        // minutes as (mm) format
        let minutesEU = ("0" + serverTimeEU.getMinutes()).slice(-2);

        targetChannel.send("It is now \n**" 
        + hoursNA + ":" + minutesNA + "** NA server time\n**" 
        + hoursA + ":" + minutesA + "** Asia server time\n**"
        + hoursEU + ":" + minutesEU + "** EU server time");
    },
    error: ({ error, command, message, info }) => {
        message.channel.send("Incorrect input!")
    }
}
