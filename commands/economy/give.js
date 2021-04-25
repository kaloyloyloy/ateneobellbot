const economy = require('../../economy')

module.exports = {
  commands: ['libre'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  callback: async (message, arguments) => {
    const userId = message.author.id
    const mention = message.mentions.users.first()
    const userMentionId = mention.id
    if (!mention) {
      message.reply('Please tag a user to give coinyos to.')
      return
    }

    const coins = parseInt(arguments[1],10)
    const userCoins = await (economy.getCoins(userId))
    if (isNaN(coins) || coins <= 0) {
      message.reply('Please provide a valid number of coinyos.')
      return
    } else if (userCoins < coins) {
      message.reply('You do not have enough coinyos.')
      return
    } else if (userId == userMentionId) {
      message.reply('You cannot libre yourself.')
      return
    }

    const newCoins = await economy.giveCoins(userId, userMentionId, coins)

    message.channel.send(
      `You gave ${coins} coinyos to <@${userMentionId}>. You now have ${newCoins} coinyos, Chong!`
    )
  },
}