'use strict';

var clientES = require('../../es.js');

module.exports = function (callback) {

  var numberActivities = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_ANALYTICS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: {"timestamp": {"order": "desc"}}
    }
  }, function getMoreUntilDone(error, response) {

      var result = [];

      response.hits.hits.forEach(function (activity) {
        result.push(activity._source);
        numberActivities += 1;
      });

      if (response.hits.total !== numberActivities) {
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
