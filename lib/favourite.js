var es = require('./es.js');
exports.register = function (server, option, next) {

  server.route([
    {
      method: 'POST',
      path: '/favourite',
      config: {
        description: 'update the list of favorite id for a specific profile',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: function (request, reply) {
          console.log(request.payload);

          if (!request.auth.isAuthenticated) {
            return reply(401);
          }
          else {
            //get candidate document based on id 
            es.get({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: request.payload.id
            }, function (error, response) {

              if (error) {
                return reply(500);
              }

              //create listFavourite property if doesnt exist
              var listFavourite = response._source.favourite || [];
              //store google user id into this list
              listFavourite.push(request.auth.credentials.id);
              response._source.favourite = listFavourite;
              //create/ update candidate profile with the new listFavourite
              es.index({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: request.payload.id,
                  body: response._source
                }, function (error, response) {

                    if (error) {
                      return reply(500);
                    }

                    if (request.payload.javascriptDisabled === 'true') {
                      return reply.redirect('/candidate/' + request.payload.id);
                    } else {
                      return reply(200); 
                    }
                    
                });
            });
          }
        }
      }
    }
  ]);
  return next();
}

exports.register.attributes = {
  name: 'Favourite'
}
