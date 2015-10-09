// var Data = require(__dirname + '/../tmp/data.json');
var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route([{

    method: 'GET',
    path: '/',
    config: {
      description: 'return the home page',
      handler: function (request, reply) {

        es.search({
          index: 'globalm'
         
          }, function (error, response) {
            if (error) {
              next(error);
            }
            var results = [];

            response.hits.hits.forEach(function (element) {
              var contact = element._source;
              contact.id = element._id;
              results.push(contact);
            });

            return reply.view('home', {candidates: results});
          });  
      }
    }
  },

    {
      method: 'POST',
      path: '/search',
      config: {
        description: 'return search results',
        handler: function (request, reply) {

          es.search({
          index: 'globalm',
          q: request.payload.searchInput
         
          }, function (error, response) {
            if (error) {
              next(error);
            }
            var results = [];

            response.hits.hits.forEach(function (element) {
              var contact = element._source;
              contact.id = element._id;
              results.push(contact);
            });

            return reply.view('home', {candidates: results});
          });
        }
      }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
