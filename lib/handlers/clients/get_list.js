'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('login');
  } else {

    var numberClients = 0;

    clientES.search({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE_CLIENTS,
      scroll: '30s',
      search_type: 'scan',
      size: 1000,
      body: {
        query: {
          match_all: {},
        },
        sort: { "companyNames": {"order": "asc"}}
      }
    }, function getMoreUntilDone(error, response) {
      var result = [];

      response.hits.hits.forEach(function (client) {
        client.id = client._id;
        client.name = client._source.companyNames;
        result.push(client);
        numberClients += 1;
      });

      if (response.hits.total !== numberClients) {
        clientES.scroll({
          scrollId: response._scroll_id,
          scroll: '30s',
          size: 1000,
        }, getMoreUntilDone);
      } else {
        return reply.view('clients', {clients: result});
      }
    });
  }
}
