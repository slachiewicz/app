var ElasticSearch = require('elasticsearch');

var createClient = function (host) {
  var client = new ElasticSearch.Client({
    host: host,
    log: 'error'
  });
  return client;
}

module.exports = createClient;
