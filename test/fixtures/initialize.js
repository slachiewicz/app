var ElasticSearch = require('elasticsearch');
var client = new ElasticSearch.Client({
  host: "http://localhost:9200",
  log: 'debug'
});

  var params = {
        "contacts": {
          "properties": {
            "skills": {
              "properties": {
                "skill":    { "type": "string" },
                "level":    { "type": "short"  }
              }
            }
          }
        }
    };

client.indices.exists({index: 'gmcontact'}, function (err, res) {

    if(res) {
    //     //delete and reset
        client.indices.delete({
          index: 'gmcontact'
        }, function (error, response) {



              client.indices.create({index: 'gmcontact'}, function (res, err) {
                  client.indices.putMapping({index:"gmcontact", type:"contacts", body:params}, function (err,resp) {
                      console.log('### Err ###:', err);
                      client.bulk({
                          body: require('./fixture-js.json')
                      }, function (err, response) {
                          console.log('The index gmcontact is ready to use');
                      });
                  });
              });


        });

    } else {
        //create
        client.indices.create({index: 'gmcontact'}, function (res, err) {
            client.indices.putMapping({index:"gmcontact", type:"contacts", body:params}, function (err,resp) {
        client.bulk({
            body: require('./fixture-js.json')
        }, function (err, response) {
            console.log('The index gmcontact is ready to use');
        });
    });
});
    }
});
