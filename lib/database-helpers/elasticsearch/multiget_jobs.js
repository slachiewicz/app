'use strict';

const clientES = require('../../es.js');

module.exports = function (ids, callback) {

  var params = ids.map( id => {return { _index: process.env.ES_INDEX, _type: process.env.ES_TYPE_JOBS, _id: id }})

  if(params.length > 0) {

    clientES.mget({
      body: {
        docs: params
      }
    }, function(error, response){
      let result = response.docs.map(job => job._source);
      result = result.filter(Boolean);
      return callback(error, result);

    });
  } else {
    return callback(null, []);
  }
}
