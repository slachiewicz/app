'use strict';

const clientES = require('../../es.js');

module.exports = function (id, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_JOBS,
    id: id
  }, function (error, response) {

    var job = response._source;
    
    return callback(error, job);
  });
}
