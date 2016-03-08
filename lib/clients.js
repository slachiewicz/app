var getListClients = require('./handlers/clients/get_list.js');

exports.register = function (server, options, next) {

  server.route({
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
  });

  return next();
}

exports.register.attributes = {
  name: 'Clients'
}
