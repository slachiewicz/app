var es = require('./es.js');
var statusHelper = require('./helpers/generateStatus.js');
var getClientsList = require('./helpers/get_clients_list');
var blacklist = require('./helpers/blacklist.js');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'GET',
    path: '/{page?}',
    config: {
      description: 'return the home page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

         if (!request.auth.isAuthenticated) {
          return reply.redirect('login');
         }
         else {

        var myId = request.auth.credentials.id;
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
          type: process.env.ES_TYPE,
          from: (pageNum - 1) * perPage,
          size: perPage,
          _source: ['id', 'picture','fullname', 'current', 'location', 'connectedTo', 'favourite', 'contacts.email', 'headline', 'notes'],
          body: {
            query: {
                match_all: {}
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
            response.hits.hits.forEach(function (profile) {
              var contact = {};
              contact.listFavourite = profile._source.favourite;
              contact.favourite = false;
              if(contact.listFavourite.indexOf(myId) !== -1) {
                contact.favourite = true;
              }

              contact.id = profile._id;
              contact.fullname = profile._source.fullname;
              contact.headline = profile._source.headline;
              contact.current = profile._source.current;
              contact.picture = profile._source.picture;
              contact.location = profile._source.location;
              contact.connectedTo = profile._source.connectedTo || [];

              //get the status from the notes
              contact.status = statusHelper(profile._source.notes);
              if (profile._source.contacts.email) {
                contact.email = profile._source.contacts.email;
              } else {
                contact.email = '';
              }

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

            //blacklist profile?
            //get the list of clients
            getClientsList(function(error, clientList){
              results.forEach(function(profile) {
                blacklist(profile, clientList);
              })

              return reply.view('home',
                {
                    candidates: results,
                    page_url_prev: page_url_prev,
                    page_url_next: page_url_next,
                    page: request.params.page || 1,
                    pages: nbPages
                });

            })
            //for each profile check if the current is in the list


             });
           }
       }
    }
    }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
