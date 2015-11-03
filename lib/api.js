var es = require('./es.js');
exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/profile',
    config: {
      description: 'save JSON object',
      handler: function (request, reply) {
          console.log('############');
        console.log(request.payload.url);


        // es.search({
        //   index: 'globalm',
        //   fields: ["fullname"],
        //   q: "fullname:" + request.payload.fullname//https://www.linkedin.com/profile/view?id=AAEAAAHfeucBZu6gaspP-4t7oxMt-r4N2PG_8Qk",
        //
        //
        // }, function (error, response) {
        //
        //     console.log(response);
        // });

        es.search({
          index: 'globalm',
          body: {
              query: {
                  match_phrase: {url: request.payload.url}
              }
         }


        }, function (error, response) {

            // console.log(response);
            if(response.hits.hits.length > 0) {
                console.log('update the profile', response.hits.hits[0].url);
            } else {
                console.log('create a new profile',request.payload.url);
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
