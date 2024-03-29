'use strict';

const getClient = require('../../database-helpers/elasticsearch/get_clients.js');
const getOwners = require('../../database-helpers/elasticsearch/get_owners.js');
const getJobs = require('../../database-helpers/elasticsearch/list_jobs.js');
const timestampToDate = require('../../helpers/timestamp-to-date');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getClient(request.params.id, function (errClient, client) {

      getOwners(function (errOwners, owners) {

        var accountManagers = owners.filter(function(owner) {

          return owner.id === client.accountManager;
        })

        client.accountManagerName = accountManagers[0].name;

        getJobs(function (errJobs, jobs) {

          var clientJobs = client.jobs.map(function (idJob) {
            var jobFilter = jobs.filter(job => {return job.id === idJob});
            return jobFilter[0];
          });

          client.startFrom = timestampToDate(client.createdAt);
          client.jobs = clientJobs.filter(Boolean);
         
          var date = new Date(client.createdAt);
          client.startFrom = date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();

          return reply.view('clientView', {client: client, owners: owners});
        })
      })

    })
  }
}
