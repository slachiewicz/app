'use strict';

const ClientES = require('../../es.js');

module.exports = function (idCandidate, documentLink, callback) {

  ClientES.update({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE,
    id: idCandidate,
    body: {
      doc: {
        cvDocumentLink: documentLink
      }
    }
  }, function (err, response) {

    return callback(err, response._id);
  });
}
