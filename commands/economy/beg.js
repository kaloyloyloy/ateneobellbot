const economy = require('../../economy')

module.exports = {
  commands: ['beg'],
  minArgs: 1,
  expectedArgs: "<The target's @>",
  callback: async (message, arguments) => {
    message.reply(`Ateneans don't beg dude.`)
  }
}