var arrCandidateObj = require('../lib/helpers/candidates_email_id.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Genereate an object with candidate email and id', function () {

  it('return the array of two candidate objects', function (done) {

      var emails = ['email1@gmail.com', 'email2@gmail.com'];
      var ids = ['12', '22'];
       
      var arr = arrCandidateObj(emails, ids);
      expect(arr.length).to.equal(2);
      done();
  });
});