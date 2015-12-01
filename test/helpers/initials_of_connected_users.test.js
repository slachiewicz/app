var helper = require('../../lib/helpers/initials_of_connected_users.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Create initials from names', function () {

  it('Create initials from a names', function (done) {

    var names = ["Anita Forever Faboulous", "Simon Says Hooray"]
    var expected = ['AFF', 'SSH'];
    var result = helper(names)
    expect(result).to.be.equal(expected);
    done();
  });
});
