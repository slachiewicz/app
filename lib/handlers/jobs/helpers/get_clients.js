const clientES = require('../../../es.js');

module.exports = function (callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CLIENTS,
    size: 100,
    body: {
      query: {
        match_all: {}
      }
    }
     
    }, function (err, response) {

      var clients = [];
      response.hits.hits.forEach(function (client) {
        var clientObj = {};
        clientObj.id = client._id;
        clientObj.name = client._source.companyNames[0];
        clients.push(clientObj);  
      });

    return callback(err, clients);
  });
}