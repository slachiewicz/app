var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/candidate/{id}',
    config: {
      description: 'return the candidate detailed view page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
         return reply.redirect('/login').code(401);
        }
        else {
          var myId = request.auth.credentials.id;

          es.get({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            id: request.params.id.toString()
          }, function (error, response) {

            var listFavourite = response._source.favourite || [];

            response._source.favourite = false;
            if(listFavourite.indexOf(myId) !== -1) {
              response._source.favourite = true;
            }
              response._source.id = response._id;
              return reply.view('candidateView', response._source);
          });
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'candidateView'
};
