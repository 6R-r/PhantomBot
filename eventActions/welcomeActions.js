const Discord = require('discord.js');
const config = require('../config.json');

class welcomeActions {
  static async channelWelcome(client, oldMember, newMember) {
    if (newMember.roles.cache.some(role => role.id === config.roles.member) && !oldMember.roles.cache.some(role => role.id === config.roles.member)) {
      const reactrole = newMember.guild.roles.cache.find(role => role.id === config.roles.reactDivider);
      const levelrole = newMember.guild.roles.cache.find(role => role.id === config.roles.rankDivider);
      try {
        await newMember.roles.add(reactrole);
        await newMember.roles.add(levelrole);
      } catch(err) {
        console.log(err);
      }

      try {
        // Add roles and send welcome message to the welcome channel
        newMember.guild.channels.cache
          .get(config.channels.welcome)
          .send(
            `🎉 **A new member has arrived!** 🎉\nPlease welcome <@${newMember.id}> to the **Zeldacord** <@&${config.roles.welcome}> team!\nWe're so glad you've joined. :blush:`
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