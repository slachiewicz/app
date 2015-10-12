// var Data = require(__dirname + '/../tmp/data.json');
var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route([{
    
      method: 'GET',
      path: '/scroll',
      config: {
        description: 'return home page',
        handler: function (request, reply) {

          var results = [];

          // first we do a search, and specify a scroll timeout
          es.search({
            index: 'globalm',
            // Set to 30 seconds because we are calling right back
            scroll: '30s',
            search_type: 'scan'
            
          }, function getMoreUntilDone(error, response) {
            // collect the title from each response
            response.hits.hits.forEach(function (element) {
              var contact = element._source;
              contact.id = element._id;
              results.push(contact);
            });

            if (response.hits.total !== results.length) {
              // now we can call scroll over and over
              es.scroll({
                scrollId: response._scroll_id,
                scroll: '30s'
              }, getMoreUntilDone);
            } else {
              console.log('every "test" title', results);
              reply.view('home', {candidates:results })
            }
          });

        }
        
      }
    },
  {
    method: 'GET',
    path: '/',
    config: {
      description: 'return the home page',
      handler: function (request, reply) {

        es.search({
          index: 'globalm',
          size: 5
         
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
          size: 100,
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
