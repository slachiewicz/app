'use strict';

require('env2')('.env');
const clientES = require('../../es.js');

module.exports = function (request, reply) {

  let numberSectors = 0;

  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_SECTORS,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    body: {
      query: {
        match_all: {},
      },
      sort: { "dateAdded": {"order": "desc"}}
    }
  }, function getMoreUntilDone(error, response) {
    var result = [];

    response.hits.hits.forEach(function (sector) {
      result.push(sector._source);
      numberSectors += 1;
    });

    if (response.hits.total !== numberSectors) {
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