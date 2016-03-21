'use strict';

const getJob = require('../../database-helpers/elasticsearch/get_jobs.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getJob(request.params.id, function (err, job) {

      return reply.view('jobDetailedView', {job:job});
    });
  }
}