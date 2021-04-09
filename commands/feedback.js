const Discord = require('discord.js');
const config = require('../config.json');

module.exports.execute = async (client, message) => {
  let feedbackMessage = new Discord.MessageEmbed()
      .setColor(config.colors.embedColor)
      .setTitle('Leave Feedback')
      .setDescription(
        `Take this three-question form to help us improve the bot: https://docs.google.com/forms/d/e/1FAIpQLSetAjKp-J9wPpLecN7jFCsacxEZaNjc7OA_PiylMQXoMHPazA/viewform`
      );
  return await message.channel.send(feedbackMessage);
};

module.exports.config = {
  name: 'feedback',
  aliases: ['rate', 'suggest'],
  module: 'Utility',
  description: 'Links to a very short Google Form to help us improve the bot.',
  usage: ['feedback'],
};
