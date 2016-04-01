'use strict';

const clientES = require('../../es.js');
const listActivities = require('../../database-helpers/elasticsearch/list_activities');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    listActivities(function(err, activities) {

      reply(activities);
    })
  }
}
