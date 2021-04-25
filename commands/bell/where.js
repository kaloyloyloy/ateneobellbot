const mongo = require('../../mongo');
const Guild = require('../../schema/guildSchema.js')
const Discord = require('discord.js');
const { prefix } = require("../../config.json");


module.exports = {
  commands: ['where'],
  minArgs: 0,
  callback: async (message, arguments, text) => {
    await mongo().then(async(mongoose) => {
      try {
        const guildId = message.guild.id;
        const channelId = message.member.voice.channel;
        let guildProfile = await Guild.findOne({_id: guildId});
        if(!guildProfile){
          guildProfile = await new Guild(
              {
                _id: guildId
              }
            )
        }
        if (!guildProfile.channelId) {
          message.reply(`Ateneo bell is currently not set.`);
        } else {

          const channelName = guildProfile.channelName
          message.reply(`Ateneo bell is currently at **${channelName}**!`);
        }
          

        

      } finally {
          mongoose.connection.close();
        }
      
    })
  }
}