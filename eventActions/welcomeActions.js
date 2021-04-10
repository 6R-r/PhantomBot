const Discord = require('discord.js');
const config = require('../config.json');

class welcomeActions {
  static async channelWelcome(client, oldMember, newMember) {
    if (newMember.roles.cache.some(role => config.roles.verified.indexOf(role.id) > -1) && !oldMember.roles.cache.some(role => config.roles.verified.indexOf(role.id) > -1)) {
      try {
        newMember.guild.channels.cache
          .get(config.channels.welcome)
          .send(
            `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${newMember.id}> to the **Zeldacord**!\nWe're so glad you've joined. <:ZeldaHeart:650247233006206976>`
          )
          .then((message) => {
            message.react(config.emotes.wave);
          });
      } catch (err) {
        console.error(err);
      }
    }
  }
}


module.exports = welcomeActions;