var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route([     
  {
    method: 'GET',
    path: '/{page?}',
    config: {
      description: 'return the home page',
      handler: function (request, reply) {

        var pageNum = request.params.page || 1;
        var perPage = 10;

        es.search({
          index: 'globalm',
          from: (pageNum - 1) * perPage,
          size: perPage          
         
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

            var page_url_prev = 1;
            var page_url_next = Math.ceil(response.hits.total / perPage);

            if (pageNum > 1) {
              page_url_prev = '/' + (pageNum - 1);
            }
            if (pageNum < page_url_next) {
              pageNum++;
              page_url_next = '/' + pageNum;
            }

            return reply.view('home', 
              {candidates: results,
              page_url_prev: page_url_prev,
              page_url_next: page_url_next,
              page: request.params.page || 1,
              pages: Math.ceil(response.hits.total / perPage)});
          });  
      }
    }
  },

    {
      method: 'GET',
      path: '/search/{query}/{page}',
      config: {
        description: 'return search results',
        handler: function (request, reply) {

          var queryString = request.params.query.replace('+', ' ');
          var pageNum = Number(request.params.page || 1);
         
          var perPage = 10;

          es.search({
            index: 'globalm',
            from: (pageNum - 1) * perPage,
            size: perPage,
            q: queryString
         
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

            var page_url_prev = 1;
            var page_url_next = Math.ceil(response.hits.total / perPage);

            if (pageNum > 1) {
              page_url_prev = '/search/' + request.params.query + '/' + (pageNum - 1);
            }
            if (pageNum < page_url_next) {
              pageNum++;
              page_url_next = '/search/' + request.params.query + '/' + pageNum;
            }

            return reply.view('home', {
              candidates: results,
              page_url_prev: page_url_prev,
              page_url_next: page_url_next,
              page: request.params.page || 1,
              query: queryString,
              pages: Math.ceil(response.hits.total / perPage)});
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
