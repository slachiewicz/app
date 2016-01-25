var client = require('./es');
var deleteSpaces = require('./helpers/delete_spaces');
var escapeValue = require('./helpers/escape_search_value');
var statusHelper = require('./helpers/generateStatus.js');
var matchTerms = require('./helpers/match_terms.js');

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

          var headline = deleteSpaces(escapeValue(request.query.job));
          var fullname = deleteSpaces(escapeValue(request.query.fullname));
          var current = deleteSpaces(escapeValue(request.query.current));
          var location = deleteSpaces(escapeValue(request.query.location));
          var skills = request.query.skills.split(',');
          skills = skills.map(deleteSpaces);
          skills = skills.filter(a => a !== '');
          skills = skills.map(function(skill) {
            return skill.toLowerCase();
          });

          var keywords = deleteSpaces(headline)
                         + ' ' + deleteSpaces(fullname)
                         + ' ' + deleteSpaces(current)
                         + ' ' + deleteSpaces(location)
                         + ' ' + skills.join(' ');

          var numberTerms = 0;

          if( !Number(request.params.page) && request.params.page !== undefined ) {
            return reply.view('404').code(404);
          }

          if(Number(pageNum) < 1) {
            return reply.redirect('/');
          }

          var mustClause = [];

          if (headline !== '') {
            numberTerms += headline.split(' ').length;
            mustClause.push({match: {headline: headline}});
          }
          if (fullname !== '') {
            numberTerms += fullname.split(' ').length;
            mustClause.push({match: {fullname: fullname}});
          }
          if (current !== '') {
            numberTerms += current.split(' ').length;
            mustClause.push({match: {current: current}});
          }
          if (location !== '') {
            numberTerms += location.split(' ').length;
            mustClause.push({match: {location: location}});
          }
          if (skills.length > 0) {
            skills.forEach(function (skill) {
              mustClause.push({match: {"skills.skill": skill}});
            })
          }

          if ( mustClause.length > 0 ) {

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
                },
                sort: [
                  {_score: {"order": "desc"}},
                  {date: {"order": "desc"}}
                ]
              }
            }, function (error, response) {
                // $lab:coverage:off$
                if (error) {
                  return next(error);
                }
                // $lab:coverage:on$
                var results = [];
                response.hits.hits.forEach(function (element) {
                  var numberTermsMatch = 0;
                  var contact = element._source;
                  contact.listFavourite = contact.favourite;
                  contact.favourite = false;
                  if(contact.listFavourite.indexOf(myId) !== -1) {
                    contact.favourite = true;
                  }
                  contact.email = contact.contacts.email;
                  contact.id = element._id;
                  contact.connectedTo = contact.connectedTo || [];
                  contact.status = statusHelper(contact.notes);

                  numberTermsMatch += matchTerms(location, contact.location);
                  numberTermsMatch += matchTerms(current, contact.current);
                  numberTermsMatch += matchTerms(fullname, contact.fullname);
                  numberTermsMatch += matchTerms(headline, contact.headline);

                  console.log(numberTermsMatch, numberTerms);
                  contact.percentageMatch = Math.round(numberTermsMatch / numberTerms * 100);
                  // avoid empty profile.
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
                  page_url_prev = '/query/' + (pageNum - 1)
                                            + '?job='+ encodeURIComponent(request.query.job)
                                            +  '&fullname=' + encodeURIComponent(request.query.fullname)
                                            +  '&current=' + encodeURIComponent(request.query.current)
                                            + '&location=' + encodeURIComponent(request.query.location)
                                            + '&skills=' + encodeURIComponent(request.query.skills);
                }
                if (pageNum < page_url_next) {
                  pageNum++;
                  page_url_next = '/query/' + pageNum
                                            + '?job='+ encodeURIComponent(request.query.job)
                                            +  '&fullname=' + encodeURIComponent(request.query.fullname)
                                            +  '&current=' + encodeURIComponent(request.query.current)
                                            + '&location=' + encodeURIComponent(request.query.location)
                                            + '&skills=' + encodeURIComponent(request.query.skills);
                }


                return reply.view('home',
                  {
                    candidates: results,
                    page_url_prev: page_url_prev,
                    page_url_next: page_url_next,
                    page: page,
                    pages: nbPages,
                    keywords: keywords,
                    headlineValue: request.query.job,
                    fullnameValue: request.query.fullname,
                    currentValue: request.query.current,
                    locationValue: request.query.location,
                    skillsValue: request.query.skills
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
