const mongo = require('../../mongo');
const Guild = require('../../schema/guildSchema.js')
const Discord = require('discord.js');
const { prefix } = require("../../config.json");


module.exports = {
  commands: ['set'],
  minArgs: 0,
  callback: async (message, arguments, text) => {
    await mongo().then(async(mongoose) => {
      try {
        if (!message.member.voice.channel){
          message.reply(`You need to be in a voice channel!`)
        }else{
          const guildId = message.guild.id
          const channelId = message.member.voice.channel
          const channelName = message.member.voice.channel.name
          let guildProfile = await Guild.findOne({_id: guildId});
          if (!guildProfile) {
            guildProfile = await new Guild(
              {
                _id: guildId
              }
            )
          } 

          await Guild.findOneAndUpdate(
            {
              _id: guildId,
            },
            {
              _id: guildId,
              channelId,
              channelName,
              bellStatus:false,
            },
            {
              upsert: true,
            }
          )
          
          message.reply(`Ateneo bell is set at **${channelName}**!`)
          }
          

      } finally {
          mongoose.connection.close()
        }
      
    })
  }
}