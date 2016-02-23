var es = require('./es.js');
var statusHelper = require('./helpers/generateStatus.js');
var lastEmailDate = require('./helpers/last_email_date.js');

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
            if(!response.found) {
              return reply.view('404').code(404);
            }
            var listFavourite = response._source.favourite;

            response._source.firstName = response._source.fullname.split(' ')[0];

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
              response._source.status = statusHelper(response._source.notes); 
              // avoid having an connectedTo null by setting an empty list:
              response._source.connectedTo = response._source.connectedTo || [];
              response._source.notes.reverse();
              var emails = response._source.emails || [];
              response._source.lastEmail = lastEmailDate(emails);
              response._source.emails = emails.reverse();
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
