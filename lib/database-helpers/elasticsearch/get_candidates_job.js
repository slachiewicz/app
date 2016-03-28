'use strict';

var clientES = require('../../es.js');

module.exports = function (idJob, callback) {

  var numberCandidates = 0;
  clientES.search({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    scroll: '30s',
    search_type: 'scan',
    size: 1000,
    _source: ['fullname', 'picture', 'jobApplications'],
    body: {
      query: {
        match: {
          "jobApplications.jobID": idJob
        },
      },
    }
  }, function getMoreUntilDone(error, response) {
    console.log(error);
      var result = [];

      response.hits.hits.forEach(function (candidate) {

        candidate._source.id = candidate._id;
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
