'use strict';

const getOwners = require('./helpers/get_owners.js');
const listCountries = require('../../database-helpers/elasticsearch/list_countries.js');
const listSectors = require('../../database-helpers/elasticsearch/list_sectors.js');
const getClients = require('./helpers/get_clients.js');
const listCategories = require('../../database-helpers/elasticsearch/list_categories');

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

          getClients(function (errClients, clients) {
             // $lab:coverage:off$
            if (errClients) {
              console.log(errClients);
            }
            // $lab:coverage:on$

            listCategories(function(errorCategories, categories){

               // $lab:coverage:off$
               if (errClients) {
                 console.log(errorCategories);
               }
               // $lab:coverage:on$

               return reply.view('jobCreateView',
                                 { owners:owners,
                                   countries:countries,
                                   sectors:sectors,
                                   clients:clients,
                                   categories: categories});

            })

          })
        });
      });
    });
  }
}
