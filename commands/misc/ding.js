module.exports = {
  commands: ['ding'],
  minArgs: 0,
  maxArgs: null,
  callback: (message, arguments, text) => {

    message.channel.send('pinging...').then(m => {
      let ping = 'Dong! Your ping is ' + (`${m.createdTimestamp - message.createdTimestamp}`) + 'ms'
      m.edit(ping)
    });
  },
}