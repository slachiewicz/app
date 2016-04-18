var stringToArray = require('../lib/helpers/string_to_array');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('return an array given a string', function () {

  it('return an array when the parameter is a string', function (done) {

      var result = stringToArray('theString');
      expect(result[0]).to.equal('theString');
      done();
  });

  it('return an array when the parameter is an array', function (done) {

      var result = stringToArray(['theString']);
      expect(result[0]).to.equal('theString');
      done();
  });
});
