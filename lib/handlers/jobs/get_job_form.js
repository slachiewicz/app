'use strict';

const clientES = require('../../es.js');
const getJob = require('../../database-helpers/elasticsearch/get_jobs.js');
const listCountries = require('../../database-helpers/elasticsearch/list_countries.js');
const listSectors = require('../../database-helpers/elasticsearch/list_sectors.js');
// const getClients = require('./helpers/get_clients.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getJob(request.params.id, function (errJob, job) {

      //COUNTRIES
      listCountries(function (errCountries, countries) {
          // $lab:coverage:off$
        if (errCountries) {
          console.log(errCountries);
        }
        // $lab:coverage:on$

        listSectors(function (errSectors, sectors) {
              // $lab:coverage:off$
          if (errSectors) {
            console.log(errSectors);
          }
          // $lab:coverage:on$
          console.log(job);
          return reply.view('jobCreateView', {job:job, countries: countries, sectors:sectors });
        })

      });

    });
  }
}
