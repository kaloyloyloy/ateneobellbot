const Discord = require("discord.js");
const { prefix } = require("./config.json");
const response = require('./response.js');
const keepAlive = require("./server.js");


const loadCommands = require('./commands/loadCommands')

const client = new Discord.Client();

keepAlive();

client.login(process.env['token']);

client.once("ready", () => {
  console.log("ready");
  client.user.setActivity(`${prefix} help`);
  loadCommands(client)
});
