var es = require('./es.js');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/connected/{fullname}/{page?}',
    config: {
      description: 'return all connections',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        var pageNum = Number(request.params.page) || 1;
        var perPage = Number(process.env.RESULTS_PER_PAGE);
        var page = Number(request.params.page) || 1;

        if( !Number(request.params.page) && request.params.page !== undefined ) {
            return reply.view('404').code(404);
          }

        if(Number(pageNum) < 1) {
          return reply.redirect('/');
        }

        var fullname = decodeURIComponent(request.params.fullname);

        es.search({
          index: process.env.ES_INDEX,
          type: process.env.ES_TYPE,
          from: (pageNum - 1) * perPage,
          size: perPage,
          _source: ['id', 'picture','fullname', 'current', 'location', 'connectedTo', 'favourite', 'contacts.email', 'headline', 'notes'],
          body: {
            query: {
              match: {
                connectedTo: fullname
              }
            },
            sort: { "date": {"order": "desc"}}
          }
        }, function (error, response) {
          // $lab:coverage:off$
            if (error) {
              next(error);
            }
            // $lab:coverage:on$
            var results = [];

            response.hits.hits.forEach(function (candidate) {
              var contact = candidate._source;
              results.push(contact);
            })

            var nbPages = Math.ceil(response.hits.total / perPage);

            if( Number(pageNum) > nbPages ) {
               return reply.redirect('/');
            }

            var page_url_prev = 1;
            var page_url_next = Math.ceil(response.hits.total / perPage);

            if (pageNum > 1) {
              page_url_prev = '/connected/' +  encodeURIComponent(fullname) + '/' + (pageNum - 1);
            }

            if (pageNum < page_url_next) {
              pageNum++;
              page_url_next = '/connected/' + encodeURIComponent(fullname) + '/' + pageNum;
            }

            return reply.view('home', 
              {
                candidates: results,
                page_url_prev: page_url_prev,
                page_url_next: page_url_next,
                page: page,
                pages: nbPages
              }
            );
        });
      }
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'Connected'
};