'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    clientES.delete({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_CLIENTS,
      id: request.params.id
    }, function (err, response) {

      return reply.redirect('/clients/list');
    })
  }  
}