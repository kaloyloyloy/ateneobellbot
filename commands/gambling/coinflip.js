const economy = require('../../economy')

module.exports = {
  commands: ['coinflip'],
  minArgs: 1,
  maxArgs: 3,
  expectedArgs: "<amount>",
  callback: async (message, arguments) => {
    const userId = message.author.id
    const mention = message.mentions.users.first()

    if (arguments[1] === "heads" || arguments[1] === "tails" ){
      const pick = arguments[1]
    } else if (!arguments[1]) {
      pick = 'heads'
    } else {
      message.reply('invalid argument')
      return
    }
    
    

    
    const coins = parseInt(arguments[0],10)
    const userCoins = await (economy.getCoins(userId))
    if (isNaN(coins) || coins <= 0 ) {
      message.reply('Please provide a valid number of coins.')
      return
    } else if (userCoins < coins) {
      message.reply('You do not have enough coinyos.')
      return
    }

    const choices= ["heads", "tails"];
    const choice = choices[Math.floor(Math.random() * choices.length)];
    message.channel.send(`**${message.author.username}** spent **${coins}** and chose ${pick}. The coin flipped **${choice}**!`)
    if (pick === choice){
      const winnings = await economy.addCoins(userId, coins)
      
      message.channel.send(`You won ${coins} coinyos!`)
    } else {
      const winnings = await economy.addCoins(userId, 0-coins)
      message.channel.send(`You lost ${coins} coinyos!`)
    }
  },
}