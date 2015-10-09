var ElasticSearch = require('elasticsearch');
var client = new ElasticSearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
module.exports = client;
