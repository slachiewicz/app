'use strict';

const clientES = require('../../es.js');
const getJob = require('../../database-helpers/elasticsearch/get_jobs.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getJob(request.params.id, function (errJob, job) {


      return reply.view('jobCreateView', {job:job});
    });
  }
}