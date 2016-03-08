'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    clientES.get({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_CLIENTS,
      id: request.params.id.toString()
    }, function (error, response) {

      if(!response.found) {
        return reply.view('404').code(404);
      }
      var client = {};
      client.id = response._id;
      client.name = response._source.companyNames;
      
      return reply.view('clientView', {client: client});
    });
  }
}