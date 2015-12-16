require('env2')('.env');
var client = require('./es');

exports.register = function (server, options, next) {

  server.route({
    method: 'POST',
    path: '/notes/{id}',
    config: {
      description: 'create notes',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        if (request.payload.status === undefined && request.payload.company === '' && request.payload.notes === '') {
          return reply.redirect('/candidate/' + request.params.id);
        } else {
          var notes = {};
          notes.status = request.payload.status;
          notes.company = request.payload.company;
          notes.notes = request.payload.notes;
          notes.author = request.auth.credentials.firstname;
          var currentDate = new Date();
          notes.createdAt = currentDate.getDate() + '-' + currentDate.getMonth() + '-' + currentDate.getFullYear();

          client.get({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            id: request.params.id,
            _source: ['notes']
            
          }, function (error, response) {
          
            var currentNote = response._source.notes;
            currentNote.push(notes);

            client.update({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: request.params.id,
              body: {
                doc: {
                  notes: currentNote
                }
              }
            }, function (error, response) {
              return reply.redirect('/candidate/' + request.params.id);
            })
          });
        }       
      }
    }

  });

  return next();
};

exports.register.attributes = {
  name: 'Notes'
};