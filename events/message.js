const config = require('../config.json');
const afkAction = require('../eventActions/afkMessageCheckAction');
const reactions = require('../eventActions/reactions');
const cafeActions = require('../eventActions/cafeActions');
const Prefixes = require('../databaseFiles/connect').Prefixes;

module.exports = async (client, message) => {
  if (!message.guild || message.author.bot) return;
  const args = message.content.split(/\s+/g); // Return the message content and split the prefix.
  var prefix;

  try {
    prefix = await Prefixes.findOne({'guild': message.guild.id});
    prefix = prefix.prefix; // Get the 'prefix' string from the JSON object if found. If not will return error for trying to get null
  } catch {
    prefix = 'z!';
  }

  if (args[0] === `<@!${client.user.id}>` || message.content.startsWith(`<@!${client.user.id}>`)) {
    prefix = `<@!${client.user.id}>`;
    if (args[0] === prefix) {
      args.shift();
      args[0] = prefix + args[0]; // Dirty fix
    }
  }

  const command =
    message.content.startsWith(config.prefix) &&
    args.shift().slice(config.prefix.length);

  if (command) {
    const commandfile =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));

    if (commandfile.config.requires) {
      var allowed = false;

      for (i = 0; i < commandfile.config.requires.length; i++) {
        if (message.member.hasPermission(commandfile.config.requires[i])) {
          allowed = true;
          break;
        }
      }

      if (allowed === false) {
        var requires = commandfile.config.requires.join('` `');

        return await message.channel.send(`:x: You do not have the permissions to use that command. Requires: ${requires}.`)
      }
    }

    if (commandfile && (allowed === undefined || allowed === true)) {
      commandfile.execute(client, message, args); // Execute found command
    }
  }
  
  // Handle greetings
  cafeActions.greetMorningOrNight(client, message);
  cafeActions.holidayReacts(client, message);
  reactions.checkIfCorrect(message);
  afkAction.checkIfUserIsAFK(client, message);
  afkAction.checkForMention(message);
};
