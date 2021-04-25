const economy = require('../../economy')

module.exports = {
  commands: ['steal'],
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: "<amount>",
  callback: async (message, arguments) => {
    const userId = message.author.id
    const mention = message.mentions.users.first()

    const userMentionId = mention.id
    
    const coins = parseInt(arguments[1],10)
    const userCoins = await (economy.getCoins(userId))
    const mentionCoins = await (economy.getCoins(userMentionId))


    if (isNaN(coins) || coins <= 0 ) {
      message.reply('Please provide a valid number of coins.')
      return
    } else if (userCoins < coins) {
      message.reply('You can only steal as much as you have!')
      return
    } else if (mentionCoins < coins) {
      message.reply('You cannot steal more than what the user has.')
      return
    } else if (userId === userMentionId) {
      message.reply('You cannot steal your own money')
      return
    }

    const choices= [1,2,3,4,5,6,7,8,9,10];
    const choice = choices[Math.floor(Math.random() * choices.length)];

    

    if (choice <= 3 ){
      const winnings = await economy.giveCoins(userMentionId, userId, coins)
      
      message.channel.send(`You successfully stole ${coins} coinyos from ${mention.username}!`)
    } else {
      const lost = await economy.giveCoins(userId, userMentionId, coins)
      message.channel.send(`Oh no! You failed in stealing from ${mention.username}! You gave ${coins} coinyos instead!`)
    }
  },
}