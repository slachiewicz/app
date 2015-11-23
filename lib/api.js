var es = require('./es.js');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/profile',
    config: {
      description: 'save JSON object',
      auth: false,
      handler: function (request, reply) {

        es.search({
          index: process.env.ES_INDEX,
          body: {
              query: {
                  match_phrase: {url: request.payload.url}
              }
         }

        }, function (error, response) {
            if(response.hits.hits.length > 0) {
                var id = response.hits.hits[0]._id;
                var connectedUsers = response.hits.hits[0]._source.connectedWith;
                if (connectedUsers.indexOf(request.payload.connectedWith[0]) === -1) {
                  connectedUsers.push(request.payload.connectedWith[0]);   
                } 
                request.payload.connectedWith = connectedUsers;

                es.index({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: id,
                  body: request.payload
                }, function (error, response) {
                  // $lab:coverage:off$
                    if(error) {
                        return next(error);
                    }
                    // $lab:coverage:on$
                  return reply(response._id);
                });

            } else {

                es.index({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  body: request.payload
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
      }
    }
  }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Api'
};
