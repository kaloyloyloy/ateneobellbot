const economy = require('../../economy')

module.exports = {
  commands: ['drop'],
  minArgs: 1,
  expectedArgs: "<coin amount>",
  callback: async (message, arguments) => {
    const userId = message.author.id
    const channelId = message.channel.id

    const coins = parseInt(arguments[0],10)
    if (isNaN(coins) || coins <= 0) {
      message.reply('Please provide a valid number of coins.')
      return
    }
    const userCoins = await (economy.getCoins(userId))
    if (userCoins < coins) {
      message.reply('You do not have enough coinyos to drop. Make hingi na lang ulit kay dad.')
      return
    }

    const newCoins = await economy.dropCoins(userId, channelId, coins)

    message.channel.send(
      `So yaman! **${message.author.username}** dropped ${coins} coinyos on the ground.`
    )
  },
}