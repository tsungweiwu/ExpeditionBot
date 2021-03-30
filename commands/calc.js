module.exports = {
    category: 'Guides',
    callback: ({ message }) => {
        const content = message.content;
        const targetChannel = message.channel;
        const author = message.author;

        let str = content.split(" ");

        let serverTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT+8"}));
        // hours as (HH) format
        let hours = ("0" + serverTime.getHours()).slice(-2);
        // minutes as (mm) format
        let minutes = ("0" + serverTime.getMinutes()).slice(-2);

        let timeStr = str[1].split(":");
        let inputHour = Number(timeStr[0]);
        let inputMin = Number(timeStr[1]);

        if (inputHour > 23 || inputHour < 0 || inputMin < 0 || inputMin > 60) return message.reply("Invalid Input");

        let timeStart = Number(hours*60) + Number(minutes);
        let timeEnd = inputHour*60 + inputMin;

        if (isNaN(timeEnd)) return message.reply("Invalid Input");

        console.log(timeStart + " and " + timeEnd);
        let difference = timeEnd - timeStart;

        if (difference < 0) {
            difference = 24*60 + difference;
        }

        message.reply("You will need to load " + difference + " minutes of AB");
    },
    error: ({ error, command, message, info }) => {
        message.channel.send("Incorrect input! Use .calc 00:00")
    }
}
