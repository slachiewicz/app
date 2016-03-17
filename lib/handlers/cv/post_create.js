'use strict';

const clientES     = require('../../es.js');
const Google       = require('googleapis');
const OAuth2       = Google.auth.OAuth2;
const Oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

const tokens = {
  access_token: process.env.CV_ACCESS_TOKEN,
  token_type: process.env.CV_TOKEN_TYPE,
  id_token: process.env.CV_ID_TOKEN,
  refresh_token: process.env.CV_REFRESH_TOKEN,
  expiry_date: process.env.CV_EXPIRY_DATE
};

Oauth2Client.setCredentials(tokens);
const Drive = Google.drive({ version: 'v3', auth: Oauth2Client });
const UpdateCVLink = require('../../database-helpers/elasticsearch/update-cv-link');
const SaveCVError = require('../../database-helpers/elasticsearch/save-cv-error');

module.exports = function (request, reply) {

 //the palyload should look like:
 /*
 {
"candidate": {
"id": "AVN1NogbbLCne1xLfKxH"
},
"fileContent": "...",
"fileType": "SAMPLE",
"name": "test1.docx",
"contentType": "application\/octet-stream",
"description": "CV",
"type": "document"
}

 */

const binary = new Buffer(request.payload.fileContent, 'base64');
const params = {
  uploadType: "media",
  media: {
    body: binary,
  },
  resource: {
    name: request.payload.name,
    description: request.payload.candidate.id,
    parents: [process.env.FOLDER_ID]
  }
};

var extension = request.payload.name.split('.')[1];

var typeMime = {
  csv:   "text/csv",
 	html:  "text/html",
 	text:  "text/plain",
  txt:   "text/plain",
  gif:   "image/gif",
  png:   "image/png",
  svg:   "image/svg+xml",
  jpeg:  "image/jpeg",
  jpg:   "image/jpeg",
  odt:   "application/vnd.oasis.opendocument.text",
  rtf:   "application/rtf",
  pdf:   "application/pdf",
  docx:  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc:   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  pptx:  "application/vnd.openxmlformats-officedocument.wordprocessingml.presentation",
  ppt:   "application/vnd.openxmlformats-officedocument.wordprocessingml.presentation",
  xls:   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xlsx:  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}

if(extension && typeMime[extension]){
  params.resource.mimeType = typeMime[extension];
}

Drive.files.create(params, function(error, response) {

  //error during the upload of a file (the response is null or empty)
  if(!Boolean(response)) {
    console.log('Error when uploading cv', error);
    const errorPayload = {
      timestamp: Date.now(),
      candidateID: request.payload.candidate.id,
      fileContent: request.payload.fileContent
    }

    SaveCVError(errorPayload, function(errorSaveCv, responseSaveCv){
      console.log('save in error data base cv');
      return reply(500);
    })

  } else {
    const documentLink = 'https://drive.google.com/file/d/' + response.id;
    UpdateCVLink(request.payload.candidate.id, documentLink, function(errorUpdateCV, responseUpdateCV) {
      console.log('response upload', response);
      return reply(response.id);
    })
  }
});

}
