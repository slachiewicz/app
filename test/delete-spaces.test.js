var Code = require('code');
var Lab = require('lab');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var deleteSpaces = require('../lib/helpers/delete_spaces.js');


describe('delete spaces in a string', function () {
 
  it('returns string with no empty spaces', function (done) {
     expect(deleteSpaces('          javascript      css')).to.equal('javascript css');
     done();
  });
});

describe('return empty string when we call a function with undefined', function () {
 
  it('returns empty string', function (done) {
     expect(deleteSpaces(undefined)).to.equal('');
     done();
  });
});


