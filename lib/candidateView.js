//var candidate = require(__dirname + '/../tmp/candidate.json');
var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/candidate/{id}',
    config: {
      description: 'return the candidate detailed view page',
      handler: function (request, reply) {

          es.get({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            id: request.params.id.toString()
          }, function (error, response) {

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
