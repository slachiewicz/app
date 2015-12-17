var helper = require('./../lib/helpers/escape_search_value.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Escape the special values for an elasticsearch query', function () {

  it('Escape the special values for an elasticsearch query', function (done) {

    var result = helper("c++")
    expect(result).to.be.equal("c\\+\\+");
    done();
  });
});
