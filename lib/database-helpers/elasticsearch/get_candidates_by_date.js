'use strict';

var clientES = require('../../es.js');

module.exports = function (callback) {

  var numberCandidates = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        constant_score: {
          filter: {
            range: {
              date: {
                gt: "1460730458129",
                lt: Date.now()
              }
            }
          }
        }
      }
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach(function (candidate) {
        result.push(candidate._source);
        numberCandidates += 1;
      });

      if (response.hits.total !== numberCandidates) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {
        return callback(error, result);
      }

    });
}
