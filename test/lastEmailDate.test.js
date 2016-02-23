var lastEmailObj = require('../lib/helpers/last_email_date.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Genereate an object with last email', function () {

  it('return the object with timestamp and sentAt properties', function (done) {

      var emails = [
      {"sentAt": "02.02.2016", "subject": "hello", "message":"Some message","senderName":"anita", "timestamp":"10","senderEmail":"email@gmail.com", "senderId":"12323"},
      {"sentAt": "04.02.2016", "subject": "hello", "message":"Some message","senderName":"simon", "timestamp":"11","senderEmail":"email@gmail.com", "senderId":"12323"},
      {"sentAt": "06.02.2016", "subject": "hello", "message":"Some message","senderName":"ines", "timestamp":"12","senderEmail":"email@gmail.com", "senderId":"12323"}
      ];
             
      var lastEmail = lastEmailObj(emails);      
      expect(lastEmail.sentAt).to.equal('06.02.2016');
      expect(lastEmail.timestamp).to.equal('12');
      done();
  });
});