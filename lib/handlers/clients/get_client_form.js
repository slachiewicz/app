'use strict';

const clientES = require('../../es.js');
const getClient = require('../../database-helpers/elasticsearch/get_clients.js');
const getOwners = require('../../database-helpers/elasticsearch/get_owners.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getClient(request.params.id, function (errClient, client) {

      getOwners(function (errOwners, owners) {

        return reply.view('clientFormView', {client: client, owners: owners});
      })

    })
  }
}
