const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true,
}

const guildSchema = new mongoose.Schema({
  _id:reqString,
  bellStatus:{
    type: Boolean,
    default: false
  }
})

module.exports = new mongoose.model('Guild',guildSchema);