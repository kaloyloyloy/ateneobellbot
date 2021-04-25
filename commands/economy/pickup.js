const economy = require('../../economy')

module.exports = {
  commands: ['pickup'],
  minArgs: 1,
  expectedArgs: "<coin amount>",
  callback: async (message, arguments) => {
    const userId = message.author.id
    const channelId = message.channel.id

    const coins = parseInt(arguments[0],10)
    if (isNaN(coins) || coins <= 0) {
      message.reply('Please provide a valid number of coinyos.')
      return
    }
    const userCoins = await (economy.getCoins(userId))
    const channelCoins = await (economy.getChannelCoins(channelId))
    console.log(channelCoins)
    if (userCoins < coins) {
      message.reply('You can only pick up as much as you have!')
      return
    }

    if (channelCoins < coins) {
      droppedCoins = await economy.dropCoins(userId, channelId, coins)
      message.reply(`You tried to pickup more than what's on the ground! You dropped ${coins} coinyos more.`)
      return
    }

    const newCoins = await economy.pickupCoins(userId, channelId, coins)

    message.channel.send(
      `**${message.author.username}** successfully picked up ${coins} coinyos!`
    )
  },
}