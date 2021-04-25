const economy = require('../../economy')

module.exports = {
  commands: ['give'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<The target's @> <coin amount>",
  callback: async (message, arguments) => {
    const userId = message.author.id
    const mention = message.mentions.users.first()

    if (!mention) {
      message.reply('Please tag a user to give coins to.')
      return
    }

    const coins = arguments[1]
    if (isNaN(coins)) {
      message.reply('Please provide a valid numnber of coins.')
      return
    }

    const userMentionId = mention.id

    const newCoins = await economy.giveCoins(userId, userMentionId, coins)

    message.channel.send(
      `You gave ${coins} coinyos to <@${userMentionId}>. You now have ${newCoins} coinyos!`
    )
  },
}