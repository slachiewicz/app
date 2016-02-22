var Code = require('code');
var Lab = require('lab');
var blacklist = require('../lib/helpers/blacklist.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

//create fixtures
var companies = ['the best company ever', 'FAC'];

describe('blacklist a profile (ie add a property clientProfile to true)', function () {

  var profile = {current: 'The best company EVER'};
  it('blacklist a profile', function (done) {
    profile = blacklist(profile, companies);
    expect(profile.clientProfile).to.equal(true);
    done();
  });
});

describe('blacklist a profile (not in the company list, clientProfile is false)', function () {
  var profile = {current: 'Wrong company'}
  it('blacklist a profile', function (done) {
    blacklist(profile, companies);
    expect(profile.clientProfile).to.equal(false);
    done();
  });
});

describe('blacklist a profile (a company name is in the current profile, clientProfile is true)', function () {
  var profile = {current: 'Developer at FAC'}
  it('blacklist a profile', function (done) {
    blacklist(profile, companies);
    expect(profile.clientProfile).to.equal(true);
    done();
  });
});
