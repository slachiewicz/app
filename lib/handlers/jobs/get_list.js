'use strict';

const clientES = require('../../es.js');
const listJobs = require('../../database-helpers/elasticsearch/list_jobs');

module.exports = function (request, reply) {

  var accept = request.headers.accept.split(',');

  listJobs(function(err, response) {

    if(accept.indexOf('application/json') !== -1) {

      return reply(response);

     } else {

      return reply.view('jobs', {result: response})
    }
  })

}
