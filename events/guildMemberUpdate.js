const welcomeActions = require('../eventActions/welcomeActions');

module.exports = async (client, oldMember, newMember) => {
  if(newMember.user.bot) return;

  welcomeActions.channelWelcome(client, oldMember, newMember);
};