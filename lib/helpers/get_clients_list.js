'use strict'

/*
* return an array of clients
*/

const es = require('../es.js');
let getClientsList = function(next) {

  es.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CLIENTS,
    size: 100,
    body: {
      query: {
          match_all: {}
      }
    }
  }, function(error, response){

    if(error) {
      return next(error);
    }

    let clientsList = [];
    response.hits.hits.forEach(function (client) {

        clientsList = clientsList.concat(client._source.companyNames);

    });

  return next(null, clientsList);
  })
}

module.exports = getClientsList;
