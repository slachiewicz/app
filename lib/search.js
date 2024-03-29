var es = require('./es.js');
var lastEmailDate = require('./helpers/last_email_date.js');

exports.register = function (server, options, next) {

    server.route([
        {
          method: 'GET',
          path: '/search/{filter}/{query}/{page}',
          config: {
            description: 'return search results',
            auth: {
              mode: 'try',
              strategy: 'jwt'
            },
            handler: function (request, reply) {

              if (!request.auth.isAuthenticated) {
                return reply.redirect('/login');
              }
              var myId = request.auth.credentials.id;
              var queryString = decodeURIComponent(request.params.query);
              queryString = queryString.split(' ').filter(k => k !== '').join(' ');
              var pageNum = Number(request.params.page);
              var perPage = Number(process.env.RESULTS_PER_PAGE);
              var filter = request.params.filter;

              if( !Number(request.params.page) && request.params.page !== undefined ) {
                 return reply.view('404').code(404);
              }


              if(Number(pageNum) < 1) {
                  return reply.redirect('/');
              }

              var bodySearch = {
                  "query": {
                      "query_string": {
                          "query": queryString
                      }
                  }
              };

              es.search({
                index: process.env.ES_INDEX,
                type: process.env.ES_TYPE,
                from: (pageNum - 1) * perPage,
                size: perPage,
                body: bodySearch

              }, function (error, response) {
                  // $lab:coverage:off$
                if (error) {
                  next(error);
                }
                // $lab:coverage:on$
                var results = [];
                response.hits.hits.forEach(function (element) {
                  var contact = element._source;
                  contact.listFavourite = contact.favourite;
                  contact.firstName = contact.fullname.split(' ')[0];
                  contact.favourite = false;
                  if(contact.listFavourite.indexOf(myId) !== -1) {
                    contact.favourite = true;
                  }
                  contact.email = contact.contacts.email;
                  contact.id = element._id;
                  contact.connectedTo = contact.connectedTo || [];
                  var emails = element._source.emails || [];
                  contact.lastEmail = lastEmailDate(emails);
                  
                  if(contact.fullname !== '') {
                    results.push(contact);
                  }
                });

                var nbPages = Math.ceil(response.hits.total / perPage);

                if( pageNum > nbPages && nbPages > 0) {
                   return reply.redirect('/');
                }

                if( nbPages === 0 ) {
                    pageNum = 0;
                }

                var page_url_prev = 1;
                var page_url_next = Math.ceil(response.hits.total / perPage);

                if (pageNum > 1) {
                  page_url_prev = '/search/' + request.params.filter + '/' + encodeURIComponent(request.params.query) + '/' + (pageNum - 1);
                }
                if (pageNum < page_url_next) {
                  pageNum++;
                  page_url_next = '/search/' + request.params.filter + '/' + encodeURIComponent(request.params.query) + '/' + pageNum;
                }


                return reply.view('home',
                {
                  candidates: results,
                  page_url_prev: page_url_prev,
                  page_url_next: page_url_next,
                  page: request.params.page,
                  query: queryString,
                  keywords: queryString,
                  pages: nbPages,
                  filter: request.params.filter
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
