'use strict';

const getOwners = require('./helpers/get_owners.js');

module.exports = function (request, reply) {

  getOwners(function (err, owners) {
    console.log(owners);
      // $lab:coverage:off$
      if (err) {
        console.log(err);
      }
      // $lab:coverage:on$
    return reply.view('jobCreateView', {owners:owners});
  });
}
