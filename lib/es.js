var ElasticSearch = require('elasticsearch');
var client = new ElasticSearch.Client({
  host: process.env.SEARCHBOX_URL,
  log: 'error'
});
module.exports = client;
