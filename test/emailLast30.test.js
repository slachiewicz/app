var emailLast30 = require('../lib/helpers/lastEmail30.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Calculates if the email was sent within last 30 days', function () {

  it('returns true if email was sent within 30 days', function (done) {

    var recentDate = Date.now();
    var olderDate = Date.now() - (30 * 24 * 60 * 60 * 1000);

    var emails = [
      {"timestamp": recentDate},
      {"timestamp": olderDate}
    ];

    var lastEmail30 = emailLast30(emails)
    expect(lastEmail30).to.equal(true);
    done();
  });


  it('returns false if email was sent over than 30 days', function (done) {

    var olderDate1 = Date.now() - (40 * 24 * 60 * 60 * 1000);
    var olderDate = Date.now() - (30 * 24 * 60 * 60 * 1000);

    var emails = [
      {"timestamp": olderDate1},
      {"timestamp": olderDate}
    ];

    var lastEmail30 = emailLast30(emails)
    expect(lastEmail30).to.equal(false);
    done();
  });
  
});