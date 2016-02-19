var emailIndicator = require('../views/helpers/emailIndicatorHelper.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Pass the last email object with undefined timestamp', function () {

  it('return the icon with the color green ', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: undefined};
    var result = emailIndicator(sentEmailObj, false);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-regular'></i>");
    done();
  });
});

describe('Pass the last email object with timestamp which is less than 1 month ', function () {

  it('return the icon with the color red ', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: new Date().getTime()};
    var result = emailIndicator(sentEmailObj, false);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-30'></i>");
    done();
  });
});

describe('Pass the last email object with timestamp which is less than 3 months ', function () {

  it('return the icon with the color amber ', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: new Date().getTime() - (60 *24 *60 *60 *1000)};
    var result = emailIndicator(sentEmailObj, false);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-90'></i>");
    done();
  });
});

describe('Pass the last email object with timestamp which is more than 3 months ', function () {

  it('return the icon with the color green ', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: new Date().getTime() - (100 *24 *60 *60 *1000)};
    var result = emailIndicator(sentEmailObj, false);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-regular'></i>");
    done();
  });
});

describe('Pass the last email object with undefined timestamp and text', function () {

  it('return the icon with the color green and text ', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: undefined};
    var result = emailIndicator(sentEmailObj, true);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-regular'><span class='last-email-regular'> Emailed after 3 months</span></i>");
    done();
  });
});

describe('Pass the last email object with timestamp which is less than 1 month', function () {

  it('return the icon with the color red and text', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: new Date().getTime()};
    var result = emailIndicator(sentEmailObj, true);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-30'><span class='last-email-30'> Emailed within a month</span></i>");
    done();
  });
});


describe('Pass the last email object with timestamp which is less than 3 months with text', function () {

  it('return the icon with the color amber with text', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: new Date().getTime() - (60 *24 *60 *60 *1000)};
    var result = emailIndicator(sentEmailObj, true);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-90'><span class='last-email-90'> Emailed within 3 months</span></i>");
    done();
  });
});

describe('Pass the last email object with timestamp which is more than 3 months ', function () {

  it('return the icon with the color green ', function (done) {

    var sentEmailObj = {sentAt: '14-02-2016', timestamp: new Date().getTime() - (100 *24 *60 *60 *1000)};
    var result = emailIndicator(sentEmailObj, true);

    expect(result.string).to.equal("<i class='fa fa-paper-plane last-email-regular'><span class='last-email-regular'> Emailed after 3 months</span></i>");
    done();
  });
});
