// Database requirements - Connection created at end
const { MongoClient } = require('mongodb');
const config = require('../config.json');

// Create connection
const client = new MongoClient(
  config.mongodbURI,
  { useUnifiedTopology: true }
);

client.connect();

// Make sure MongoDB can be accessed outside of this file
module.exports.Prefixes = client.db(config.mongodbDatabase).collection('Prefixes');
module.exports.Afks = client.db(config.mongodbDatabase).collection('Afks');
module.exports.BotStats = client.db(config.mongodbDatabase).collection('BotStats');
