module.exports = {
    calcAB: function (message) {
        let str = message.content.split(" ");

        let serverTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT+8"}));
        // hours as (HH) format
        let hours = ("0" + serverTime.getHours()).slice(-2);
        // minutes as (mm) format
        let minutes = ("0" + serverTime.getMinutes()).slice(-2);

        let timeStr = str[1].split(":");
        let inputHour = Number(timeStr[0]);
        let inputMin = Number(timeStr[1]);

        let timeStart = Number(hours*60) + Number(minutes);
        let timeEnd = inputHour*60 + inputMin;
        console.log(timeStart + " and " + timeEnd);
        let difference = timeEnd - timeStart;

        if (difference < 0) {
            difference = 24*60 + difference;
        }

        return message.channel.send("<@" + message.author + ">, You will need to load " + difference + " minutes of AB");
    }
}