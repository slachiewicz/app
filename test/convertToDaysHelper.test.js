var miliToDays = require('../views/helpers/convertToDaysHelper.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Convert miliseconds to days', function () {

  it('return number of days', function (done) {

    var timestamp = '1455380099367';
    var current = '1455812127924';
             
    var difference = current - timestamp;
    var days = miliToDays(difference);

      expect(days).to.equal(5);
      done();
  });
});