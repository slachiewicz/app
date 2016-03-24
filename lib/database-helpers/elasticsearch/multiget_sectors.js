'use strict';

const clientES = require('../../es.js');

module.exports = function (ids, callback) {

  var params = ids.map( id => {return { _index: process.env.ES_INDEX, _type: process.env.ES_TYPE_SECTORS, _id: id }})

  clientES.mget({
    body: {
      docs: params
    }
  }, function(error, response){

    const result = response.docs.map(sector => sector._source)
    return callback(error, result);

  });
}
