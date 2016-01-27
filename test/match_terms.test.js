var helper = require('./../lib/helpers/match_terms.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Return the number of occurences of a terms in a phrase', function () {

  it('Return 1 for searching "london uk" in "London, United Kingdom"', function (done) {

    var terms = "london uk";
    var field = "London, United Kingdom";
    var result = helper(terms, field);
    expect(result).to.be.equal(1);
    done();
  });
});
