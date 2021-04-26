const cron = require("node-cron");
const parser = require('cron-parser');
const Discord = require('discord.js');

var mwfbell_one;
var mwfbell_two;
var ttsbell_one;
var ttsbell_two;
var ttsbell_three;
var ttsbell_four;
var testcronjob;
var testing;

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
        testcronjob = new cron.schedule("*/1 * * * *", function(){
        console.info('cron job completed');
        }, {
          scheduled: false
        }); 
        testcronjob.start();
        

        
        mwfbell_one = new cron.schedule("50 6-20 * * 1,3,5", function() {
            console.log('JOB EXECUTED');
            playBell(vc);
        }, {
          scheduled: false
        });
        mwfbell_one.start();

        console.log('Bell initiated.');

        mwfbell_two = new cron.schedule("0 7-21 * * 1,3,5",function() {
            playBell(vc);
        }, {
          scheduled: false
        });
        mwfbell_two.start();

        ttsbell_one = new cron.schedule('50 7,10,13,16,19 * * 2,4,6', function() {
            playBell(vc);
        }, {
          scheduled: false
        });
        ttsbell_one.start();

        ttsbell_two = new cron.schedule('0 8,11,14,17,20 * * 2,4,6', function() {
            playBell(vc);
        }, {
          scheduled: false
        });
        ttsbell_two.start();

        ttsbell_three = new cron.schedule('20 9,12,15,18,21 * * 2,4,6', function() {
            playBell(vc);
        }, {
          scheduled: false
        });
        ttsbell_three.start();

        ttsbell_four = new cron.schedule('30 9,12,15,18,21 * * 2,4,6', function() {
            playBell(vc);
        }, {
          scheduled: false
        });
        ttsbell_four.start();
    },
    stop: function () {
        mwfbell_one.stop();
        mwfbell_two.stop();
        ttsbell_one.stop();
        ttsbell_two.stop();
        ttsbell_three.stop();
        ttsbell_four.stop();
        testcronjob.stop();
    },
    test: function (vc) {
      testing = new cron.schedule("0 */1 * * * *", function(){
  // perform operation e.g. GET request http.get() etc.
      console.info('cron job completed');
      playBell(vc);
      }, {
          scheduled: false
        }); 
      testing.start();
    }

};

