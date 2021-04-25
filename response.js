const Discord = require("discord.js");
const prefix = require("./config.json");

module.exports = {
  helpMsg: function (msg, client) {
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#10059f')
	.setTitle('Commands')
	.setAuthor('Ateneo Bell Bot', 'https://i.imgur.com/gWAE0R6.png')
	.setDescription('This bot simulates the Ateneo bell.')
	.addFields(
		{ name: '`set`', value: 'sets the bell to a voice channel', inline: true },
    { name: '`start`', value: 'starts the bell', inline: true },
    { name: '`stop`', value: 'stops the bell', inline: true },
    { name: '`ding`', value: 'checks ping', inline: true },
    { name: '`dong`', value: 'wink', inline: true },
    { name: '`bell me`', value: 'rings the bell if you are in a voice channel', inline: true },
    { name: '`conyoify`', value: 'makes last message sound conyo', inline: true },
    
  )
	.setFooter('© @kaloyloyloy ', 'https://i.imgur.com/gWAE0R6.png');

  msg.channel.send(exampleEmbed);
  },
  pingMsg: function (msg) {
    msg.channel.send('pinging...').then(m => {
      let ping = 'Dong! Your ping is ' + (`${m.createdTimestamp - msg.createdTimestamp}`) + 'ms'
      m.edit(ping)
    });
  },
  conyoify: function(msg) {
    msg.channel.messages.fetch({ limit: 2 }).then(messages => {
      let lastMessage = messages.last();
      msg.channel.send(`parang like ${lastMessage}`);
    });
  },
  startBellMsg: function (msg) {
    msg.channel.send('🔔 Bell is up my dudes 🔔');
  },
  runningBellMsg: function(msg) {
    msg.channel.send(`Bell is already up.`)
  },
  stopBellMsg: function (msg) {
    msg.channel.send('see ya!');
  },
  noVCMsg: function(msg) {
    msg.channel.send('No voice channel is set!');
  },
  setVCMsg: function(msg) {
    msg.channel.send(`Where do you want the bell to ring? Join in a voice channel and reply **^here.**`);
  },
  vcActiveMsg: function(msg,channelName) {
    msg.channel.send(`Ateneo bell is set at **${channelName}**!`);
  },
  userNotInVCMsg: function(msg) {
    msg.channel.send('You need to be in a voice channel!');
  },
  currentVCMsg: function(msg, channelName) {
    msg.channel.send(`Ateneo bell is currently set at **${channelName}**, do you want to change channels? **^yes** or **^no.**`);
  },
  keepBellMsg: function(msg, channelName) {
    msg.channel.send(`The bell will remain in **${channelName}**.`);
  },
}