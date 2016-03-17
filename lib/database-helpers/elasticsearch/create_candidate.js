'use strict';

var clientES = require('../../es.js');

module.exports = function (candidate, callback) {

  clientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    body: candidate
  }, function (err, response) {

    return callback(err, response._id);
  });
}