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
          query: {
              match_all: {}
          }

          }, function (error, response) {
              // $lab:coverage:off$
            if (error) {
              next(error);
            }
            // $lab:coverage:on$
            var results = [];
            response.hits.hits.forEach(function (profile) {
              var contact = profile._source;
              contact.id = profile._id;
              results.push(contact);
            });

            var nbPages = Math.ceil(response.hits.total / perPage);

            if( Number(pageNum) > nbPages ) {
               return reply.redirect('/');
            }

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
              {
                  candidates: results,
                  page_url_prev: page_url_prev,
                  page_url_next: page_url_next,
                  page: request.params.page || 1,
                  pages: nbPages
               });
             }
           );
       }
    }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
