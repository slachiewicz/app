var candidate = require(__dirname + '/../tmp/candidate.json');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/candidate/{id}',
    config: {
      description: 'return the candidate detailed view page',
      handler: function (request, reply) {

        return reply.view('candidateView', candidate);
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'candidateView'
};