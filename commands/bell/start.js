const mongo = require('../../mongo');
const Guild = require('../../schema/guildSchema.js')
const Discord = require('discord.js');
const { prefix } = require("../../config.json");
const bells = require("../../bells.js");

module.exports = {
  commands: ['start'],
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
        if (!guildProfile.channelId) {
          message.reply(`Ateneo bell is currently not set.`);
        } else {

            if (!guildProfile.bellStatus && guildProfile.channelId) {
              bells.initiateBell(guildProfile.channelId);
              bells.start();
              const channelName = guildProfile.channelName
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
            } else if (!guildProfile.bellStatus && !guildProfile.channelId){
              message.channel.send('No voice channel is set!');
            } else if (guildProfile.channelId){
              message.channel.send(`Bell is already up.`)
            };
        }

      } finally {
          mongoose.connection.close();
        }
      
    })
  }
}