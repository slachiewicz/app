var es = require('./es.js');
exports.register = function (server, option, next) {

  server.route({
    method: 'GET',
    path: '/dashboard/{idUser?}',
    config: {
      description: 'return user dashboard page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        } else {
          var myId = request.auth.credentials.idUser;

          es.get({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            id: request.params.idUser.toString()
          }, function (error, response) {
            if(!response.found) {
              return reply.view('404').code(404);
            }
            
              // var result = [];
              console.log(response._source.fullname);
              console.log(response);
             
              return reply.view('dashboard', response._source);
          });
        }       
      }
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'Dashboard'
};