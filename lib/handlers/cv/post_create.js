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

console.log(tokens);
Oauth2Client.setCredentials(tokens);
const Drive = Google.drive({ version: 'v3', auth: Oauth2Client });

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
    description: request.payload.candidate.id
  }
};

  Drive.files.create(params, function(error, response) {
    console.log('error', error);
    console.log('response', response);
    console.log('response.id', response.id);
    reply(response.id);
  });

}
