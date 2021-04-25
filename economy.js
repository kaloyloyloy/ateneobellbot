const mongo = require('./mongo')
const userSchema = require('./schema/userSchema')

const coinsCache = {} // { 'guildId-userId': coins }

module.exports = (client) => {}

module.exports.addCoins = async (userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await userSchema.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          _id: userId,
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      coinsCache[`${userId}`] = result.coins

      return result.coins
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.giveCoins = async (userId, userMentionId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()')

      const result = await userSchema.findOneAndUpdate(
        {
          _id: userId,
        },
        {
          _id: userId,
          $inc: {
            coins: 0-coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      const give = await userSchema.findOneAndUpdate(
        {
          _id: userMentionId,
        },
        {
          _id: userMentionId,
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      console.log('RESULT:', result)

      coinsCache[`${userId}`] = result.coins

      return result.coins
    } finally {
      mongoose.connection.close()
    }
  })
}

module.exports.getCoins = async (userId) => {
  const cachedValue = coinsCache[`${userId}`]
  console.log(cachedValue)
  if (cachedValue) {
    return cachedValue
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()')

      const result = await userSchema.findOne({
        _id: userId,
      })

      console.log('RESULT:', result)

      let coins = 0
      if (result) {
        coins = result.coins
      } else {
        console.log('Inserting a document')
        await new userSchema({
          _id: userId,
          coins,
        }).save()
      }

      coinsCache[`${userId}`] = coins

      return coins
    } finally {
      mongoose.connection.close()
    }
  })
}
