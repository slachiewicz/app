'use strict';

var clientES = require('../../es.js');

module.exports = function (callback) {

  var numberCategories = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CATEGORIES,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: { "id": {"order": "asc"}}
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach(function (category) {
        result.push(category._source);
        numberCategories += 1;
      });

      if (response.hits.total !== numberCategories) {
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
