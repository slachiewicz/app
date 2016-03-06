var postCreate = require('./handlers/cv/post_create.js');

exports.register = function (server, option, next) {

  server.route(
    {
      method: 'POST',
      path: '/cv/create',
      config: {
        description: 'Save the cv for a specific candidate',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: postCreate
      }
    }

  );
  return next();
}

exports.register.attributes = {
  name: 'Cv'
}
