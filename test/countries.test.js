require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/countries/list json format', function () {

  it('return list of countries in json format', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/countries/list",
        headers: { accept: 'application/json' }
      };


      server.inject(options, function (res) {
        var countries = JSON.parse(res.payload)
        expect(countries.length).to.equal(1);
        expect(countries[0].value).to.equal(2188);
        expect(countries[0].label).to.equal('Andorra');
        server.stop(done);
      });
    });
  });
});