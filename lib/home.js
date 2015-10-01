// var Data = require(__dirname + '/../tmp/data.json');
var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/',
    config: {
      description: 'return the home page',
      handler: function (request, reply) {

        var ids = [0,1,2,3];
        es.mget({
          index: 'globalm',
          type: 'contact',
          body: {
            ids: ids
          }
        }, function(error, response){
          //et the soures
          var candidates = [];
          response.docs.forEach(function (contact) {
              candidates.push(contact._source);
          });
          return reply.view('home', {candidates: candidates});
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
