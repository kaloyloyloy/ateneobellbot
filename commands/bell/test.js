const mongo = require('../../mongo');
const Guild = require('../../schema/guildSchema.js')
const Discord = require('discord.js');
const { prefix } = require("../../config.json");
const bells = require("../../bells.js");


module.exports = {
  commands: ['test'],
  minArgs: 0,
  callback: async (message, arguments, text) => {
    await mongo().then(async(mongoose) => {
      try {
        const guildId = message.guild.id;
        const channel = message.member.voice.channel;
        const channelName = message.member.voice.channel.name;
        let guildProfile = await Guild.findOne({_id: guildId});
        if(!guildProfile){
          guildProfile = await new Guild(
              {
                _id: guildId
              }
            )
        }
        
        if (!guildProfile.bellStatus) {
          console.log(typeof channel);
          console.log(guildProfile.channelObj);
          bells.test(channel);
          message.channel.send(`🔔 Bell is up in **${channelName}** my dudes 🔔`);
          await Guild.findOneAndUpdate(
            {
              _id: guildId,
            },
            {
              bellStatus:true,
            },
            {
              upsert: true,
            }
          )
        }  else if (guildProfile.bellStatus){
          message.channel.send(`Bell is already up.`)
        };
        

      } finally {
          mongoose.connection.close();
        }
      
    })
  }
}