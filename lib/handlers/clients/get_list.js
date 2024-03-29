'use strict';

const clientES = require('../../es.js');
const getAccountManager = require('../../database-helpers/elasticsearch/get_owners.js');
const timestampToDate = require('../../helpers/timestamp-to-date');
const listClients = require('../../database-helpers/elasticsearch/list_clients');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {

    return reply.redirect('login');

  } else {

    var numberClients = 0;

    getAccountManager(function (err, accountManagers) {

      listClients(function (errListClients, clients) {

          clients.forEach(function (client) {

            var accountManager = accountManagers.filter(function (manager) {
              return manager.id === client.accountManager;
            });

            client.accountManagerName = accountManager[0].name;
            client.startFrom = timestampToDate(client.createdAt);
          })

        return reply.view('clients', {clients: clients});
      })

    })
  }
}
