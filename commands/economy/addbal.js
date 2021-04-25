const economy = require('../../economy')

module.exports = {
  commands: ['addbalance', 'addbal'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  permissionError: 'You must be an administrator to use this command.',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments) => {
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to add coinyos to.')
      return
    }

    const coins = parseInt(arguments[1],10)
    if (isNaN(coins) || coins <= 0) {
      message.reply('Please provide a valid number of coinyos.')
      return
    }

    const userId = mention.id

    const newCoins = await economy.addCoins(userId, coins)

    message.reply(
      `You have given <@${userId}> ${coins} coinyos. They now have ${newCoins} coinyos, Chong!`
    )
  },
}