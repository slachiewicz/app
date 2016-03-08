'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

   if (request.payload.name === '') {
      
      return reply.redirect('/client/' + request.params.id);

    } else {

      clientES.update({
        index: process.env.ES_INDEX,
        type: process.env.ES_TYPE_CLIENTS,
        id: request.payload.id,
        body: {
          doc: {
            companyNames: [request.payload.name]
          }
        }

      }, function (err, response) {

        return reply.redirect('/client/list');       
      });
    }   
  }  
}