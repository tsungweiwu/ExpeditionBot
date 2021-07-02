const {google} = require("googleapis");

module.exports = {
    callback: async ({ message, instance }) => {
        try {
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

            let msg = `__Today is **${values[1][1]}** of **Week ${values[1][0]}**__, we will be running race on **${values[1][2]}**`;

            return message.channel.send(msg);
        } catch (err) {
            console.error(err);
        }
    }
}
