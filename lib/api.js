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

            console.log(response.hits.hits[0]._source);
            // if(response.hits.hits.length > 0) {
            //
            //     var id = response.hits.hits[0]._id;
            //     console.log('object', request.payload.experience.current);
            //     console.log('update the profile', response.hits.hits[0]._source.url, response.hits.hits[0]._id);
            //     es.index({
            //       index: process.env.ES_INDEX_EXTENSION,
            //       type: process.env.ES_TYPE,
            //       id: id,
            //       body: request.payload
            //     }, function (error, response) {
            //         console.log('error', error);
            //         if(!error){
            //             es.delete({
            //               index: process.env.ES_INDEX,
            //               type: process.env.ES_TYPE,
            //               id: id
            //             }, function (error, response) {
            //               console.log('response delete', response);
            //             });
            //         }
            //         console.log('response', response);
            //     });
            //
            // } else {
            //
            //     console.log('create a new profile',request.payload.url);
            //     es.index({
            //       index: process.env.ES_INDEX_EXTENSION,
            //       type: process.env.ES_TYPE,
            //       body: request.payload
            //     }, function (error, response) {
            //         console.log('error create', error);
            //         console.log('response create', create);
            //     });
            // }
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
