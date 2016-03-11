'use strict';

const clientES = require('../../es.js');
const getAccountManager = require('../../database-helpers/elasticsearch/get_owners.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('login');
  } else {

    var numberClients = 0;

    getAccountManager(function (err, accountManagers) {
      
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
        sort: { "name": {"order": "asc"}}
      }
      }, function getMoreUntilDone(error, response) {
        var result = [];

        response.hits.hits.forEach(function (client) {
          var clientObj = client._source;
          clientObj.id = client._id;

          var accountManager = accountManagers.filter(function (manager) {
            return manager.id === clientObj.accountManager;
          });

          clientObj.accountManagerName = accountManager[0] ? accountManager[0].name : 'Not defined';
          
          var date = new Date(clientObj.createdAt);
          clientObj.startFrom = date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
          result.push(clientObj);
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
    });   
  }
}
