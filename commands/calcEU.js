const { ApplicationCommandOptionType } = require("discord.js");
const { CommandType, CooldownTypes } = require("wokcommands");

module.exports = {
    description: "Calculate AB time",
    type: CommandType.BOTH,
    slash: 'both',

    options: [
        {
            name: 'time',
            description: 'The time',
            required: true,
            type: ApplicationCommandOptionType.String
        }
    ],

    cooldowns: {
        errorMessage: "Please wait {TIME}",
        type: CooldownTypes.perUser,
        duration: "5 s"
    },

    category: 'Guides',

    callback: ({ args }) => {
        try {
            let serverTime = new Date(new Date().toLocaleString("en-US", {timeZone: "Etc/GMT-2"}));
            // hours as (HH) format
            let hours = ("0" + serverTime.getHours()).slice(-2);
            // minutes as (mm) format
            let minutes = ("0" + serverTime.getMinutes()).slice(-2);

            let timeStr = args[0].split(":");
            let inputHour = Number(timeStr[0]);
            let inputMin = Number(timeStr[1]);

            if (inputHour > 23 || inputHour < 0 || inputMin < 0 || inputMin > 60) return "Invalid Input";

            let timeStart = Number(hours*60) + Number(minutes);
            let timeEnd = inputHour*60 + inputMin;

            if (isNaN(timeEnd)) return "Invalid Input";

            let difference = timeEnd - timeStart;

            if (difference < 0) {
                difference = 24*60 + difference;
            }

            return "You will need to load " + difference + " minutes of AB";
        } catch (error) {
            return "Incorrect input! Use .calc 00:00";
        }
    }
}
