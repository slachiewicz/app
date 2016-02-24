var capitalizeFirstLetter = require('../lib/helpers/capitalize_first_letter.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Uppercase the first letter of the name', function () {

  it('return the name with uppercase first letter', function (done) {

    var name = 'anita';

    var stringCapitalize = capitalizeFirstLetter(name);
    expect(stringCapitalize).to.equal('Anita');
    done();
  });
});
