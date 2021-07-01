const {google} = require("googleapis");

module.exports = {
    fortAnnounce: async function (title, client, config) {
        const auth = new google.auth.GoogleAuth({
            keyFile: "client_secret.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        })

        const gClient = await auth.getClient();

        const googleSheets = google.sheets({version: 'v4', auth: gClient});

        const spreadsheetId = "1D4iWIwyKdU0awsFbGychh_UzElGA9ewXi_hfJ-JTBJk";

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Schedule!C:E",
        })

        let values = getRows.data.values;
        let roleMention = values[1][2] === 'Milk' ? '<@&625536070787923969>' : '<@&837023846615089203>';

        let message = `__Today is **${values[1][1]}** of **Week ${values[1][0]}**__, we will be running race on **${values[1][2]}**\n${roleMention} Fort in **10 minutes!**`;

        client.channels.cache.get(config.fortChannelId).send(message);

        // client.channels.cache.get(config.fortChannelId).send('**' + title + '**\n' + (config.fortMention !== '' ? `<@&${config.fortMention}>` : '') + 'It\'s time for Guild Fort Race! Please log on and help us get this dub!');
    }
}
