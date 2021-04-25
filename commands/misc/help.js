const Discord = require("discord.js");
module.exports = {
  commands: ['help'],
  minArgs: 0,
  maxArgs: null,
  callback: (message, arguments, text) => {

    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#10059f')
	.setTitle('Commands')
	.setAuthor('Ateneo Bell Bot', 'https://i.imgur.com/gWAE0R6.png')
	.setDescription('This bot simulates the Ateneo bell.')
	.addFields(
		{ name: '`set`', value: 'sets the bell to a voice channel', inline: true },
    { name: '`where`', value: 'where the bell is set to', inline: true },
    { name: '`start`', value: 'starts the bell', inline: true },
    { name: '`stop`', value: 'stops the bell', inline: true },
    { name: '`ding`', value: 'checks ping', inline: true },
    { name: '`dong`', value: 'wink', inline: true },
    { name: '`bell me`', value: 'rings the bell if you are in a voice channel', inline: true },
    { name: '`conyoify`', value: 'makes last message sound conyo', inline: true },
    
  )
	.setFooter('© @kaloyloyloy ', 'https://i.imgur.com/gWAE0R6.png');

  message.channel.send(exampleEmbed);
  },
}