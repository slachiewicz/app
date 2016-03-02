var es = require('./es.js');
var postCreate = require('./handlers/candidates/post_create.js');

exports.register = function (server, option, next) {

  server.route(
    {
      method: 'POST',
      path: '/candidates/create',
      config: {
        description: 'Create the candidate',
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
  name: 'Candidates'
}
