const Discord = require('discord.js');
const config = require('../config.json');

class bookmarkActions {
  static async addBookmark(client, user, reaction) {
		if (reaction._emoji && reaction._emoji.name === config.emotes.bookmark) {
      var username = reaction.message.author.username;
      var message = reaction.message.content;
      var avatar = reaction.message.author.displayAvatarURL();
      var link = `https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`;

      var att = (reaction.message.attachments);

      let bookmarkMessage = new Discord.MessageEmbed()
        .setColor(config.colors.embedColor)
        .setAuthor(username, avatar)
        .setDescription(message + "\n\n**[Click to jump to message.](" + link + ")**");

      reaction.message.embeds.forEach((embed) => {
        console.log(embed)
        if (embed.description) bookmarkMessage.addField('Embed Description', embed.description);
        if (embed.image) bookmarkMessage.setImage(embed.image.url);
        if (embed.fields.length > 0) {
          var fields = '';

          embed.fields.forEach((field) => {
            fields = `${fields}\n\n\`${field.name}\`\n> ${field.value}`
          });

          bookmarkMessage.addField('Embed Fields', fields);
        }
      });
      
      if (att.array()[0]) {
        await user.send(bookmarkMessage, {files: att.array()});
      } else {
        await user.send(bookmarkMessage);
      }
      
      return true;
    }
  }

  static async removeBookmark(client, user, reaction) {
  }
}

module.exports = bookmarkActions;