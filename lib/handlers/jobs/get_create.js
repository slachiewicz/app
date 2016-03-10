'use strict';

const getOwners = require('./helpers/get_owners.js');
const getCountries = require('./helpers/get_countries.js');
const getSectors = require('./helpers/get_sectors.js');
const getClients = require('./helpers/get_clients.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('login');
  } {

    getOwners(function (errOwners, owners) {
      // $lab:coverage:off$
      if (errOwners) {
        console.log(errOwners);
      }
      // $lab:coverage:on$
      getCountries(function (errCountries, countries) {
          // $lab:coverage:off$
        if (errCountries) {
          console.log(errCountries);
        }
        // $lab:coverage:on$

        getSectors(function (errSectors, sectors) {
              // $lab:coverage:off$
          if (errSectors) {
            console.log(errSectors);
          }
          // $lab:coverage:on$

          getClients(function (errClients, clients) {
             // $lab:coverage:off$
          if (errClients) {
            console.log(errClients);
          }
          // $lab:coverage:on$
            return reply.view('jobCreateView', {owners:owners, countries:countries, sectors:sectors, clients:clients});
          })
        });
      });
    });
  }
}
