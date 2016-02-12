require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var nock = require('nock');

var sendEmail = require('../lib/helpers/sendemail_gmail.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var fs = require('fs');
var REAL_TOKEN = JSON.parse(fs.readFileSync('./test/fixtures/sample-auth-token-anita.json', 'utf8'));

var date = new Date().toUTCString();

describe('Attempt to sendEmail with right token', function () {

  it('succesfully  send email with expired token', function (done) {

    var email = 'dolores.maria9810@gmail.com';
    
    var tokens = REAL_TOKEN;

    var options = {
      name: 'anita',
      senderEmail: 'czaplaanita@gmail',
      subject: 'Do You Read Me? > ' + date,
      message: 'Hi there'      
    }

    sendEmail(email, options, tokens, function (err, response) {
      console.log(err);
      console.log(response);
      expect(response.labelIds[0]).to.equal('SENT');
    });
  });
});