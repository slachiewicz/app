'use strict';

const getCandidatesByDate = require('../../database-helpers/elasticsearch/get_candidates_by_date.js');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  } else {

    getCandidatesByDate(function (err, result) {
      console.log(result);
      reply.view('stats');
    })

  }
};
