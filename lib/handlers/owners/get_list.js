'use strict';

require('env2')('.env');
const clientES = require('../../es.js');

module.exports = function (request, reply) {

  let numberUsers = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_OWNERS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      }
    }
  }, function getMoreUntilDone(error, response) {
    var result = [];

    response.hits.hits.forEach(function (user) {
      result.push(user._source);
      numberUsers += 1;
    });

    if (response.hits.total !== numberUsers) {
      clientES.scroll({
        scrollId: response._scroll_id,
        scroll: '30s',
        size: 1000,
      }, getMoreUntilDone);
    } else {

      return reply(result);
    }
  });
}