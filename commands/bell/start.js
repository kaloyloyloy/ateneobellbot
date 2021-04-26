const mongo = require('../../mongo');
const Guild = require('../../schema/guildSchema.js')
const Discord = require('discord.js');
const { prefix } = require("../../config.json");
const bells = require("../../bells.js");

module.exports = {
  commands: ['start'],
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
          bells.initiateBell(channel);
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
        } else if (guildProfile.bellStatus){
          message.channel.send(`Bell is already up.`)
        } else if (!channel){
          message.channel.send(`You need to be in a channel to start the bell!`)
        };
        

      } finally {
          mongoose.connection.close();
        }
      
    })
  }
}