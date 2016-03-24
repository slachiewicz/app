'use strict';

const clientES = require('../../es.js');
const getJob = require('../../database-helpers/elasticsearch/get_jobs.js');
const getCountries = require('../../database-helpers/elasticsearch/list_countries.js');
// const getSectors = require('./helpers/get_sectors.js');
// const getClients = require('./helpers/get_clients.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getJob(request.params.id, function (errJob, job) {

      //COUNTRIES
      getCountries(function (errCountries, countries) {
          // $lab:coverage:off$
        if (errCountries) {
          console.log(errCountries);
        }
        // $lab:coverage:on$
        console.log(job);
        return reply.view('jobCreateView', {job:job, countries: countries});

      });

    });
  }
}
