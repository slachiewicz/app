'use strict';

const clientES = require('../../es.js');

module.exports = function (request, reply) {

 //the palyload should look like:
 /*
 {
 "candidate": {
 "id": $candidateID
 },
 "externalID": "Resume",
 "fileContent": $fileEncodedInBase64,
 "fileType": "SAMPLE",
 "name": $filename,
 "contentType": "application/octet-stream",
 "description":"CV",
 "type": "document"
 }

 */

  var cvObject = request.payload
  delete cvObject.fileContent;

  clientES.index({
    index: process.env.ES_INDEX,
    type: process.env.ES_TYPE_CV,
    id: cvObject.candidate.id,
    body: {
      payload: cvObject
    }
  }, function (err, response) {
    // $lab:coverage:off$
    if(err) {
        return next(err);
    }
    // $lab:coverage:on$
    return reply(cvObject.candidate.id);
  });

}
