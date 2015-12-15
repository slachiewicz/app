var client = require('./es');
var deleteSpaces = require('./helpers/delete_spaces');
exports.register = function(server, options, next) {

  server.route([

    {
      method: 'GET',
      path: '/query/{page?}',
      config: {
        description: 'return the search results using job, name, location and skills fields',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: function (request, reply) {

          if (!request.auth.isAuthenticated) {
            return reply.redirect('/login');
          }

          var myId = request.auth.credentials.id;
          var pageNum = Number(request.params.page) || 1;
          var perPage = Number(process.env.RESULTS_PER_PAGE);
          var page = Number(request.params.page) || 1;

          var headline = request.query.job;
          var fullname = request.query.fullname;
          var location = request.query.location;
          var skills = request.query.skills.split(',');
          skills = skills.map(deleteSpaces);
          skills = skills.filter(a => a !== '');

          var keywords = deleteSpaces(headline)
                         + ' ' + deleteSpaces(fullname)
                         + ' ' + deleteSpaces(location)
                         + ' ' + skills.join(' ');

          if( !Number(request.params.page) && request.params.page !== undefined ) {
            return reply.view('404').code(404);
          }

          if(Number(pageNum) < 1) {
            return reply.redirect('/');
          }

          var mustClause = [];

          if (headline !== '') {
            mustClause.push({match: {headline: headline}});
          }
          if (fullname !== '') {
            mustClause.push({match: {fullname: fullname}});
          }
          if (location !== '') {
            mustClause.push({match: {location: location}});
          }
          if (skills.length > 0) {
            skills.forEach(function (skill) {
              mustClause.push({match: {"skills.skill": skill}});
            })
          }

          if (mustClause.length > 0 ) {

            client.search({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              from: (pageNum - 1) * perPage,
              size: perPage,
              body: {
                query: {
                  bool: {
                    must: mustClause
                  }
                }
              }

            }, function (error, response) {
                // $lab:coverage:off$
                if (error) {
                  return next(error);
                }
                // $lab:coverage:on$
                var results = [];
                response.hits.hits.forEach(function (element) {
                  var contact = element._source;
                  contact.listFavourite = contact.favourite || [];
                  contact.favourite = false;
                  if(contact.listFavourite.indexOf(myId) !== -1) {
                    contact.favourite = true;
                  }
                  if (contact.contacts && contact.contacts.email) {
                    contact.email = contact.contacts.email;
                  } else {
                    contact.email = '';
                  }
                  contact.id = element._id;
                  contact.connectedTo = contact.connectedTo || [];
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
                  page_url_prev = '/query/' + (pageNum - 1) + '?job='+ request.query.job +  '&fullname=' + fullname + '&location=' + location;
                }
                if (pageNum < page_url_next) {
                  pageNum++;
                  page_url_next = '/query/' + pageNum + '?job='+ request.query.job +  '&fullname=' + fullname + '&location=' + location;
                }


                return reply.view('home',
                  {
                    candidates: results,
                    page_url_prev: page_url_prev,
                    page_url_next: page_url_next,
                    page: page,
                    pages: nbPages,
                    keywords: keywords
                  });

            });

          } else {
            return reply.redirect('/');
          }
        }
      }
    }
  ]);

  return next();
};

exports.register.attributes = {
  name: 'Query'
};
