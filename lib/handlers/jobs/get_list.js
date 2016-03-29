'use strict';

const clientES = require('../../es.js');
const listJobs = require('../../database-helpers/elasticsearch/list_jobs');
const listCountries = require('../../database-helpers/elasticsearch/list_countries');

module.exports = function (request, reply) {

  var accept = request.headers.accept.split(',');

  listJobs(function(err, response) {

    if(accept.indexOf('application/json') !== -1) {

      return reply(response);

     } else {

       listCountries(function(errorCountries, countries) {

         response.forEach(function(job) {

           const countryLabels = countries.filter(function(countryObj) {
             return countryObj.value.toString() === job.address.countryID.toString();
           });

           job.countryLabel = countryLabels[0].label;
         })
         return reply.view('jobs', {result: response})
       })

    }
  })

}
