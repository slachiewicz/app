'use strict';

var clientES = require('../../es.js');

module.exports = function (url, callback) {

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    body: {
      query: {
        match_phrase: {
          url: url
        }
      }
    }
  }, function (err, response) {
    
    var result = response.hits.hits.length > 0 ? response.hits.hits[0]._id : null;

    return callback(err, result);
  });
}