var es = require('./es.js');

exports.register = function (server, options, next) {

    server.route([
        {
          method: 'GET',
          path: '/search/{query}/{page}',
          config: {
            description: 'return search results',
            handler: function (request, reply) {

              var queryString = decodeURIComponent(request.params.query);
              var pageNum = request.params.page;
              var perPage = Number(process.env.RESULTS_PER_PAGE);

              if( !Number(request.params.page) && request.params.page !== undefined ) {
                 return reply.view('404').code(404);
              }


              if(Number(pageNum) < 1) {
                  return reply.redirect('/');
              }

              es.search({
                index: process.env.ES_INDEX,
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

                var nbPages = Math.ceil(response.hits.total / perPage);

                if( Number(pageNum) > nbPages ) {
                   return reply.redirect('/');
                }

                var page_url_prev = 1;
                var page_url_next = Math.ceil(response.hits.total / perPage);

                if (pageNum > 1) {
                  page_url_prev = '/search/' + encodeURIComponent(request.params.query) + '/' + (pageNum - 1);
                }
                if (pageNum < page_url_next) {
                  pageNum++;
                  page_url_next = '/search/' + encodeURIComponent(request.params.query) + '/' + pageNum;
                }


                return reply.view('home',
                {
                  candidates: results,
                  page_url_prev: page_url_prev,
                  page_url_next: page_url_next,
                  page: request.params.page,
                  query: queryString,
                  pages: nbPages

                  });
              });
            }
          }
        }
    ]);

  return next();
};

exports.register.attributes = {
  name: 'Search'
};
