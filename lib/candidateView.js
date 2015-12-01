var es = require('./es.js');
var initials_helper = require('./helpers/initials_of_connected_users.js');
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/candidate/{id}/{keywords?}',
    config: {
      description: 'return the candidate detailed view page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
         return reply.redirect('/login');
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

              if (request.params.keywords) {
                response._source.keywords = decodeURIComponent(request.params.keywords);
              } else {
                response._source.keywords = '';
              }

              var context = response._source;
              context.connectedTo = context.connectedTo || []; 
              context.initials = initials_helper(context.connectedTo)
              return reply.view('candidateView', context);
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
