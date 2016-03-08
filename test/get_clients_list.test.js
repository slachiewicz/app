var Code = require('code');
var Lab = require('lab');
var getClientsList = require('../lib/helpers/get_clients_list.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

//create fixtures

describe('Get the list of clients', function () {

  it('returns the list of clients', function (done) {
    getClientsList(function(error, list) {

      console.log('list', list);
      expect(list.length).to.equal(3);
      expect(list[0]).to.equal('FAC');
      expect(list[1]).to.equal('DWYL');
      done();
    })
  });
});
