var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/{page?}',
    config: {
      description: 'return the home page',
      handler: function (request, reply) {

        if( !Number(request.params.page) && request.params.page !== undefined ) {
           return reply.view('404');
        }

        var pageNum = request.params.page || 1;
        var perPage = 10;

        es.search({
          index: 'globalm',
          from: (pageNum - 1) * perPage,
          size: perPage

          }, function (error, response) {
              // $lab:coverage:off$
            if (error) {
              next(error);
            }
            // $lab:coverage:on$
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

          var queryString = decodeURIComponent(request.params.query);
          var pageNum = Number(request.params.page);

          var perPage = 10;
        //
        //   if ( pageNum >= 1) {
        //
        //
        //   }
          if( pageNum < 1 ) {

              return reply.view('home', {
                candidates: [],
            });

          }

          es.search({
            index: 'globalm',
            from: (pageNum - 1) * perPage,
            size: perPage,
            q: queryString

          }, function (error, response) {
              // $lab:coverage:off$
            if (error) {
              next(error);
            }
            // $lab:coverage:on$
            var results = [];

            response.hits.hits.forEach(function (element) {
              var contact = element._source;
              contact.id = element._id;
              results.push(contact);
            });

            var page_url_prev = 1;
            var page_url_next = Math.ceil(response.hits.total / perPage);

            if (pageNum > 1) {
              page_url_prev = '/search/' + encodeURIComponent(request.params.query) + '/' + (pageNum - 1);
            }
            if (pageNum < page_url_next) {
              pageNum++;
              page_url_next = '/search/' + encodeURIComponent(request.params.query) + '/' + pageNum;
            }

            return reply.view('home', {
              candidates: results,
              page_url_prev: page_url_prev,
              page_url_next: page_url_next,
              page: request.params.page,
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
