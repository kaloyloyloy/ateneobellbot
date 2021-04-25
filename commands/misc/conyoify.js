module.exports = {
  commands: ['conyoify'],
  minArgs: 0,
  maxArgs: null,
  callback: (message, arguments, text) => {

    message.channel.messages.fetch({ limit: 2 }).then(messages => {
      let lastMessage = messages.last();
      message.channel.send(`parang like ${lastMessage} dude`);
    });
  },
}