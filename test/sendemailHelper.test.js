require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var sendEmail = require('../lib/helpers/email/send_email.js');
var google       = require('googleapis');
var OAuth2       = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var fs = require('fs');
// var REAL_TOKEN = require(__dirname + '/fixtures/sample-auth-token-anita.json');
var PROFILE = require(__dirname + '/fixtures/sample-auth-credentials.json');

var date = new Date().toUTCString();

describe('Attempt to sendEmail with the expired token', function () {

  it('return error code 400', function (done) {

    var obj = {email: 'dolores.maria9810@gmail.com', id: '6767', firstName: 'maria'};

    var tokens = PROFILE;
    oauth2Client.setCredentials(tokens.tokens);
    var options = {
      name: 'anita',
      senderEmail: 'czaplaanita@gmail.com',
      subject: 'Do You Read Me? > ' + date,
      message: 'Hi there'
    }
    var user = {};
    user.fn = 'Anita';
    user.role = 'Developer';
    user.office = '000';
    user.mobile = '1111';
    user.linkedin = 'li/anita';

    sendEmail(obj, options, oauth2Client, user, function (err, response) {
      console.log(err, response);
      expect(err['code']).to.equal(400);
      done();
    });
  });
});


// describe('Attempt to sendEmail with the right token', function () {

//   it('succesfully send email with real token', function (done) {

//     var email = 'dolores.maria9810@gmail.com';

//     var profile = JSON.parse(process.env.REAL_TOKEN);
//     console.log('-------', profile);
//     console.log(typeof profile);

//     var options = {
//       name: 'anita',
//       senderEmail: 'czaplaanita@gmail.com',
//       subject: 'Do You Read Me? > ' + date,
//       message: 'Hi there'
//     }

//     sendEmail(email, options, profile.tokens, function (err, response) {
//       console.log('ERR',err);
//       console.log('RS',response);
//       expect(response.labelIds[0]).to.equal('SENT');
//       expect(err).to.equal(null);
//       done();
//     });
//   });
// });
