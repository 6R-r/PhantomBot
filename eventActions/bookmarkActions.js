const Discord = require('discord.js');
const config = require('../config.json');
const path = require('path');

class bookmarkActions {
  static async addBookmark(client, user, reaction) {
		if (reaction._emoji && reaction._emoji.name === config.emotes.bookmark) {
      var username = reaction.message.author.username;
      var message = reaction.message.content;
      var avatar = reaction.message.author.displayAvatarURL();
      var attachments = [];
      var link = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`;

      var att = (reaction.message.attachments);

      let bookmarkMessage = new Discord.MessageEmbed()
        .setColor(config.colors.embedColor)
        .setAuthor(username, avatar)
        .setDescription(message + "\n\n**[Click to jump to message.](" + link + ")**");

      if (att.array()) {
        att.array().forEach((image) => {
          var image_url = path.parse(image.url);

          image_url = `${image_url.dir}/${image_url.name}/${image_url.ext.split(/[^A-Za-z]/)[0]}`;

          attachments.push(image_url);
        });
      }

      reaction.message.embeds.forEach((embed) => {
        if (embed.description) bookmarkMessage.addField('Embed Description', embed.description);
        if (embed.image) {
          var image_url = path.parse(embed.image.url);

          image_url = `${image_url.dir}/${image_url.name}/${image_url.ext.split(/[^A-Za-z]/)[0]}`;

          attachments.push(image_url);
        }
        if (embed.fields.length > 0) {
          var fields = '';

          embed.fields.forEach((field) => {
            fields = `${fields}\n\n\`${field.name}\`\n> ${field.value}`
          });

          bookmarkMessage.addField('Embed Fields', fields);
        }
      });
      
      await user.send({embed: bookmarkMessage, files: attachments});
      
      return true;
    }
  }

  static async removeBookmark(client, user, reaction) {
  }
}

module.exports = bookmarkActions;