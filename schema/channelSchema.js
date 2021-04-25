const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const channelSchema = mongoose.Schema({ 
  _id: reqString,
  coins: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('channel', channelSchema)