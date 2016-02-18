var es = require('./es.js');
var transform_linkedin_url = require('linkedin-canonical-url');
var completeProfile = require('./helpers/complete_profile');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/profile',
    config: {
      description: 'save JSON object',
      auth: false,
      handler: function (request, reply) {
        request.payload.date = Date.now();
        if(request.payload.url) {
            request.payload.url = transform_linkedin_url(request.payload.url);
            es.search({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              body: {
                  query: {
                      match_phrase: {url: request.payload.url}
                  }
             }

            }, function (error, response) {
                if(response.hits.hits.length > 0) {

                    var id = response.hits.hits[0]._id;

                    var connectedUsers = response.hits.hits[0]._source.connectedTo;
                    //if 1st degree contact, update allow
                    if(request.payload.connectedTo[0] || connectedUsers.length === 0) {
                      if (connectedUsers.indexOf(request.payload.connectedTo[0]) === -1) {
                        connectedUsers.push(request.payload.connectedTo[0]);
                      }
                      request.payload.connectedTo = connectedUsers;

                      //keep the list of favourite if the profile is updated from the api
                      request.payload.favourite = response.hits.hits[0]._source.favourite;

                      //keep the list of notes
                      request.payload.notes = response.hits.hits[0]._source.notes;
                      
                      //keep emails
                      request.payload.emails = response.hits.hits[0]._source.emails || []; 

                      es.index({
                        index: process.env.ES_INDEX,
                        type: process.env.ES_TYPE,
                        id: id,
                        body: completeProfile(request.payload)
                      }, function (error, response) {
                        // $lab:coverage:off$
                          if(error) {
                              return next(error);
                          }
                          // $lab:coverage:on$
                        return reply(response._id);
                      });
                    } else {
                      return reply("401");
                    }
                } else {
                    es.index({
                      index: process.env.ES_INDEX,
                      type: process.env.ES_TYPE,
                      body: completeProfile(request.payload)
                    }, function (error, response) {
                      // $lab:coverage:off$
                        if(error) {
                            return next(error);
                        }
                        // $lab:coverage:on$
                        return reply(response._id);
                    });
                }
            });
          }else {
            es.index({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              body: completeProfile(request.payload)
            }, function (error, response) {
              // $lab:coverage:off$
                if(error) {
                    return next(error);
                }
                // $lab:coverage:on$
                return reply(response._id);
            });
          }
      }
    }
  }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Api'
};
