var ElasticSearch = require('elasticsearch');
var client = new ElasticSearch.Client({
  host: "http://localhost:9200",
  log: 'debug'
});

client.indices.exists({index: 'gmcontact'}, function (err, res) {

    if(res) {
        //delete and reset
        client.indices.delete({
          index: 'gmcontact'
        }, function (error, response) {
          if(!error) {
              client.bulk({
                  body: require('./fixture-js.json')
              }, function (err, response) {
                  console.log('The index gmcontact is ready to use');
              });
          }
        });
    }

    else {
        //create
        client.bulk({
            body: require('./fixture-js.json')
        }, function (err, response) {
            console.log('The index gmcontact is ready to use');
        });
    }
});
