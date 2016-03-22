'use strict';

const getJob = require('../../database-helpers/elasticsearch/get_jobs');
const getClients = require('../../database-helpers/elasticsearch/list_clients');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getJob(request.params.id, function (err, job) {

      getClients(function (errClients, clients) {

        const client = clients.filter(function (client) {
          return client.jobs.indexOf(job.id) > -1;
        })

        job.client = client[0];

        return reply.view('jobDetailedView', {job:job});
      })

    });
  }
}