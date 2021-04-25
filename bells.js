const cron = require("cron");

var mwfbell_one;
var mwfbell_two;
var ttsbell_one;
var ttsbell_two;
var ttsbell_three;
var ttsbell_four;

async function playBell(vc) {

    vc.join().then(connection => {
        const dispatcher = connection.play('./audio.mp3');
        dispatcher.setVolume(0.25);

        dispatcher.on('start', () => {
            console.log('audio.mp3 is now playing!');
        });

        dispatcher.on('finish', () => {
            console.log('audio.mp3 has finished playing!');
            vc.leave();
        });
    });
}

module.exports = {
    initiateBell: function (vc) {
        mwfbell_one = new cron.CronJob('50 6-20 * * 1,3,5', () => {
            playBell(vc);
        });
        mwfbell_two = new cron.CronJob('00 7-21 * * 1,3,5', () => {
            playBell(vc);
        });
        ttsbell_one = new cron.CronJob('50 7,10,13,16,19 * * 2,4,6', () => {
            playBell(vc);
        });
        ttsbell_two = new cron.CronJob('00 8,11,14,17,20 * * 2,4,6', () => {
            playBell(vc);
        });
        ttsbell_three = new cron.CronJob('20 9,12,15,18,21 * * 2,4,6', () => {
            playBell(vc);
        });
        ttsbell_four = new cron.CronJob('30 9,12,15,18,21 * * 2,4,6', () => {
            playBell(vc);
        });
    },
    start: function () {
        mwfbell_one.start();
        mwfbell_two.start();
        ttsbell_one.start();
        ttsbell_two.start();
        ttsbell_three.start();
        ttsbell_four.start();
    },
    stop: function () {
        mwfbell_one.stop();
        mwfbell_two.stop();
        ttsbell_one.stop();
        ttsbell_two.stop();
        ttsbell_three.stop();
        ttsbell_four.stop();
    },
};

