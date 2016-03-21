const getOwners = require('../../database-helpers/elasticsearch/get_owners.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {
    getOwners(function (errOwners, owners) {

      return reply.view('clientFormView', {client: {}, owners: owners});
    })
  }
 
}