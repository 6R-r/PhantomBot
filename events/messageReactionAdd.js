const bookmarkActions = require('../eventActions/bookmarkActions');

module.exports = async (client, reaction, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (reaction.partial) {
    // If the message this reaction belongs to was a partial we ignore it
    // Because raw.js should run this after fetching the partial
    return;
  }
  
  // Bookmark messages in DMs
  bookmarkActions.addBookmark(client, user, reaction);
  // Remove bookmarks in DMs
  bookmarkActions.removeBookmark(client, user, reaction);
};
