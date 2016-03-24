'use strict';

const getJob = require('../../database-helpers/elasticsearch/get_jobs');
const getClients = require('../../database-helpers/elasticsearch/list_clients');
const getCountries = require('../../database-helpers/elasticsearch/get_countries');
const multigetSectors = require('../../database-helpers/elasticsearch/multiget_sectors');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getJob(request.params.id, function (err, job) {

      getCountries(job.address.countryID, function (errCountries, country) {

        // $lab:coverage:off$
        if (errCountries) {
          console.log(errCountries);
        }
        // $lab:coverage:on$

        getClients(function (errClients, clients) {

          const client = clients.filter(function (client) {
            return client.jobs.indexOf(job.id) > -1;
          })

          job.client = client[0];
          job.countryLabel = country.country;

          //create an array of ids sectors
          const idsSector = job.businessSectors.data.map( sectorObj => sectorObj.id);

            multigetSectors(idsSector, function(errorSectors, responseSectors) {

              job.sectors = responseSectors;
              return reply.view('jobDetailedView', {job:job});
            })

        });

      });

    });
  }
}
