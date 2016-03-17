'use strict';

const ClientES = require('../../es.js');

module.exports = function (errorPayload, callback) {

  ClientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CV,
    id: errorPayload.candidateID,
    body: errorPayload
  }, function (err, response) {

    return callback(err, response._id);
  });
}
