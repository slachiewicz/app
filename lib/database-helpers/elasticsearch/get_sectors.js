'use strict';

const clientES = require('../../es.js');

module.exports = function (id, callback) {

  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_SECTORS,
    id: id
  }, function (error, response) {

    var sector = response._source;
    
    return callback(error, sector);
  });
}