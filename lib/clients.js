var getListClients = require('./handlers/clients/get_list.js');
var getCreate = require('./handlers/clients/get_create.js');
var getDetailedClient = require('./handlers/clients/get_client.js');
var postUpdate = require('./handlers/clients/post_update.js');
var postCreate = require('./handlers/clients/post_create.js');
var postDelete = require('./handlers/clients/post_delete.js');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/clients/list',
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
    path: '/clients/create',
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
    path: '/clients/{id}',
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
    path: '/clients/{id}',
    config: {
      description: 'update a client with the given id',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postUpdate
    }
  },

  {
    method: 'POST',
    path: '/clients/create',
    config: {
      description: 'creates a new client',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postCreate
    }
  },

  {
    method: 'POST',
    path: '/clients/delete/{id}',
    config: {
      description: 'delete specific client with the given id',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: postDelete
    }
  }

  ]);

  return next();
}

exports.register.attributes = {
  name: 'Clients'
}
