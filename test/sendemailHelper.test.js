// require('env2')('.env');
// var Code = require('code');
// var Lab = require('lab');
// var Server = require('../lib/index.js');
// // var nock = require('nock');

// var sendEmail = require('../lib/helpers/sendemail_gmail.js');

// var lab = exports.lab = Lab.script();
// var describe = lab.experiment;
// var expect = Code.expect;
// var it = lab.test;
// var fs = require('fs');
// var REAL_TOKEN = require(__dirname + '/fixtures/sample-auth-token-anita.json');

// var date = new Date().toUTCString();

// describe('Attempt to sendEmail with expired token', function () {

//   it('not succesfully send email with real token', function (done) {

//     var email = 'dolores.maria9810@gmail.com';
    
//     var tokens = REAL_TOKEN;

//     var options = {
//       name: 'anita',
//       senderEmail: 'czaplaanita@gmail.com',
//       subject: 'Do You Read Me? > ' + date,
//       message: 'Hi there'      
//     }

//     sendEmail(email, options, tokens, function (err, response) {
//       console.log('ERR',err);
//       console.log('RS',response);
//       // expect(response.labelIds[0]).to.equal('SENT');
//       expect(err).to.equal(400);
//       done();
//     });
//   });
// });