'use strict';

var clientES = require('../../es.js');

module.exports = function (id, email, callback) {


  clientES.get({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: id,
    _source: ['emails']
  }, function (errorGet, responseGet) {
    // $lab:coverage:off$
    if(errorGet) {
      return callback(errorGet);
    }
    // $lab:coverage:on$
    
    let currentEmail = responseGet._source.emails || [];
    currentEmail.push(email);

    clientES.update({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: id,
      body: {
        doc: {
          emails: currentEmail
        }
      }

    }, function (errorUpdate, responseUpdate) {

      return callback(errorUpdate, responseUpdate);

    })
  })

}
