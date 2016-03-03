'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {


  var accept = request.headers.accept.split(',');
  var numberJobs = 0;

  if(accept.indexOf('application/json') !== -1) {
    
    clientES.search({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_JOBS,
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

      response.hits.hits.forEach(function (job) {
        result.push(job._source);
        numberJobs += 1;
      });

      if (response.hits.total !== numberJobs) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {

        return reply(result);
      }
    });

  } else {

    return reply('html list of jobs')

  }
}
