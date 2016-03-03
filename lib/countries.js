const getList = require('./handlers/countries/get_list.js');

exports.register = function (server, option, next) {

  server.route(
    {
      method: 'GET',
      path: '/countries/list',
      config: {
        description: 'return list of countries',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getList
      }
    }
    
  );
  return next();
}

exports.register.attributes = {
  name: 'Countries'
}
