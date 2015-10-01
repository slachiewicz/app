//var candidate = require(__dirname + '/../tmp/candidate.json');
var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/candidate/{id}',
    config: {
      description: 'return the candidate detailed view page',
      handler: function (request, reply) {
          console.log(request.params.id);
          es.get({
            index: 'globalm',
            type: 'contact',
            id: request.params.id.toString()
          }, function (error, response) {
              console.log(response);
              return reply.view('candidateView', response._source);
          });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'candidateView'
};
