const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
}

const guildSchema = new mongoose.Schema({
  _id:reqString,
  channelId: {
    type: String,
    default: ''
  },
  channelName: String,
  bellStatus:{
    type: Boolean,
    default: false
  }
})

module.exports = new mongoose.model('Guild',guildSchema);