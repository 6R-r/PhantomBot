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

      if (att.array()[0]) {
        att = att.array()[0].url;
        bookmarkMessage.setImage(att);
      }
      
      await user.send(bookmarkMessage);
      return true;
    }
  }
}

module.exports = bookmarkActions;