var getListClients = require('./handlers/clients/get_list.js');
var getCreate = require('./handlers/clients/get_create.js');
var getDetailedClient = require('./handlers/clients/get_client.js');
var postUpdate = require('./handlers/clients/post_update.js');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/client/list',
    config: {
      description: 'return list of clients',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getListClients
    }
  },
  {
    method: 'GET',
    path: '/client/create',
    config: {
      description: 'return create a client page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getCreate
    }
  },

  {
    method: 'GET',
    path: '/client/{id}',
    config: {
      description: 'return a client with the given id',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getDetailedClient
    }
  },

  {
    method: 'POST',
    path: '/client/{id}',
    config: {
      description: 'update a client with the given id',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postUpdate
    }
  }

  ]);

  return next();
}

exports.register.attributes = {
  name: 'Clients'
}
