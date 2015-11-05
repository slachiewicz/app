var ElasticSearch = require('elasticsearch');
var client = new ElasticSearch.Client({
  host: process.env.SEARCHBOX_URL,
  log: 'debug'
});
module.exports = client;
