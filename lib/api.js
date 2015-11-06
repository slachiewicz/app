var es = require('./es.js');
require('env2')('.env');
exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/profile',
    config: {
      description: 'save JSON object',
      handler: function (request, reply) {

        es.search({
          index: process.env.ES_INDEX,
          body: {
              query: {
                  match_phrase: {url: request.payload.url}
              }
         }

        }, function (error, response) {
            console.log(request.payload);
            if(response.hits.hits.length > 0) {

                var id = response.hits.hits[0]._id;
                es.index({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: id,
                  body: request.payload
                }, function (error, response) {
                    if(error) {
                        return next(error);
                    }
                    console.log('error', error);
                    console.log('response update', response);
                });

            } else {

                es.index({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  body: request.payload
                }, function (error, response) {
                    if(error) {
                        return next(error);
                    }
                    console.log('error create', error);
                    console.log('response create', create);
                });
            }
        });
        return reply(200);
      }
    }
  }

  ]);

  return next();
};

exports.register.attributes = {
  name: 'Api'
};
