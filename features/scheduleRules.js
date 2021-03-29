let expeditionVote = require('./expedMessageVote.js');
let expedition = require('./expeditionAnnouncement');
const schedule = require('node-schedule')
let fort = require('./fortAnnouncement');

module.exports = {
    fort: function(client, config) {
        if (config.isTimeVote) return;
        // fort
        const fortRule = new schedule.RecurrenceRule();
        fortRule.hour = 19;
        fortRule.minute = 00;
        fortRule.tz = 'Etc/GMT+8';
        //50 12 * * *
        const fortRace = schedule.scheduleJob(fortRule, function () {
            fort.fortAnnounce("Guild Fort Race", client, config);
        });
        fortRace.schedule();
    },
    morning: function(client, config) {
        // morning
        const morningRule = new schedule.RecurrenceRule();
        morningRule.hour = 9;
        morningRule.minute = 45;
        morningRule.tz = 'Etc/GMT+8';
        //50 12 * * *
        const morningExpeds = schedule.scheduleJob(morningRule, function () {
            if (config.isTimeVote) {
                expeditionVote.message("Morning Expeditions", client, config);
            }
            else {
                expedition.message("Morning Expeditions", client, config);
            }
        });
        morningExpeds.schedule();
    },
    evening: function(client, config) {
        // evening
        const eveningRule = new schedule.RecurrenceRule();
        eveningRule.hour = 17;
        eveningRule.minute = 45;
        eveningRule.tz = 'Etc/GMT+8';
        //50 12 * * *
        const eveningExpeds = schedule.scheduleJob(eveningRule, function () {
            if (config.isTimeVote) {
                expeditionVote.message("Evening Expeditions", client, config);
            }
            else {
                expedition.message("Evening Expeditions", client, config);
            }
        });
        eveningExpeds.schedule();
    },
    bonus: function(client, config) {
        // Bonus
        const bonusRule = new schedule.RecurrenceRule();
        bonusRule.hour = 15;
        bonusRule.minute = 45;
        bonusRule.tz = 'Etc/GMT+8';
        bonusRule.dayOfWeek = [0, 6];
        //50 12 * * *
        const bonusExpeds = schedule.scheduleJob(bonusRule, function () {
            if (config.isTimeVote) {
                expeditionVote.message("Bonus Expeditions", client, config);
            }
            else {
                expedition.message("Bonus Expeditions", client, config);
            }
        });
        bonusExpeds.schedule();
    }
}
