module.exports = {
  commands: ['bell me', 'b'],
  minArgs: 0,
  maxArgs: null,
  callback: (message, arguments, text) => {

    if (message.member.voice.channel) {
      let vc = message.member.voice.channel;
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
    }else {
      message.channel.send('You need to be in a voice channel!');
    }
  },
}