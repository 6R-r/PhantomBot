const Discord = require('discord.js');
const fields = require('../config.json');
const version = fields.version;
const versioninfo = fields.versioninfo;
const config = require('../config.json');

module.exports.execute = async (client, message) => {
  let infoMessage = new Discord.MessageEmbed()
    .setColor(config.colors.embedColor)
    .setTitle('Phantom')
    .setThumbnail(
      'https://cdn.discordapp.com/attachments/326804095073779712/829028266017816576/phantom.png'
    )
    .addField(
      'Description',
      'A fun and helpful custom bot made specifically for the Zeldacord.'
    )
    .addField('Version', version)
    .addField('Version Info', versioninfo)
    .addField(
      'GitHub',
      'Want to help me develop PhantomBot? Check out the repo on GitHub! https://github.com/zmontgo/PhantomBot'
    );
  return await message.channel.send(infoMessage);
};

module.exports.config = {
  name: 'botinfo',
  aliases: ['bot', 'info', 'version'],
  module: 'Utility',
  description: 'Learn more about Phantom.',
  usage: ['botinfo'],
};
