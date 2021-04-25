const { prefix } = require('../config.json')

const ValidatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = '',
    minArgs= 0,
    maxArgs = null,
    permissions = [],
    requiredRoles = [],
    callback
  } = commandOptions


// makes sure commands are in array
  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Registering command "${commands[0]}"`)

// validates permissions and makes sure permissions are in array
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }
    ValidatePermissions(permissions)
  }


// listens for messages
  client.on('message', message =>{
    const { member, content, guild } = message

    for (const alias of commands){
      if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {


        for (const permission of permissions){
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(role => 
          role.name === requiredRole)
          
          if(!role || !members.roles.cache.has(role.id)) {
            message.reply(`You must have the "${requiredRole}" role to use this command.`)
            return
          }
          
        }

        const arguments = content.split(/[ ]+/)
        arguments.shift()

        if (arguments.length < minArgs || (
          maxArgs !== null && arguments.length > maxArgs
        )){
          message.reply(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`)
          return

        }

         callback(message, arguments, arguments.join(' '))

        return
      } 
    }
  })
}

module.exports.updateCache = (guildId, newPrefix) => {
  guildPrefixes[guildId] = newPrefix
}

module.exports.loadPrefixes = async (client) => {
  await mongo().then(async (mongoose) => {
    try {
      for (const guild of client.guilds.cache) {
        const guildId = guild[1].id

        const result = await commandPrefixSchema.findOne({ _id: guildId })
        guildPrefixes[guildId] = result.prefix
      }

      console.log(guildPrefixes)
    } finally {
      mongoose.connection.close()
    }
  })
}