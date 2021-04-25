const mongo = require('../../mongo');
const Guild = require('../../schema/guildSchema.js')
const Discord = require('discord.js');
const { prefix } = require("../../config.json");
const bells = require("../../bells.js");

module.exports = {
  commands: ['stop'],
  minArgs: 0,
  maxArgs: null,
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
        if (!guildProfile.bellStatus) {
          message.reply(`Ateneo bell is not up.`);
        } else if (guildProfile.bellStatus) {
          bells.initiateBell(guildProfile.channelId);
          bells.stop();
          await Guild.findOneAndUpdate(
            {
              _id: guildId,
            },
            {
              bellStatus:false,
            },
            {
              upsert: true,
            }
          )
          message.channel.send('see ya!');
        }
          

        

      } finally {
          mongoose.connection.close();
        }
      
    })
  }
}