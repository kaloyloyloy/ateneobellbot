const economy = require('../../economy')

module.exports = {
  commands: ['balance', 'bal'],
  minArgs: 0,
  expectedArgs: "[Target user's @]",
  callback: async (message) => {
    const userId = message.author.id

    const coins = await economy.getCoins(userId)

    message.reply(`You have ${coins} coinyos!`)
  },
}