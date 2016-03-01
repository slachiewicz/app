'use strict';

require('env2')('.env');
const clientES = require('../../es.js');

module.exports = function (request, reply) {

  clientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_TOAD,
    body: {
      payload: request.payload
    }
  }, function (err, response) {
    // $lab:coverage:off$
    if(err) {
        return next(err);
    }
    // $lab:coverage:on$
    return reply(response._id);
  });

}