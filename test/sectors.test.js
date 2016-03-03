require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/sectors/list json format', function () {

  it('return list of sectors in json format', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/sectors/list",
        headers: { accept: 'application/json' }
      };


      server.inject(options, function (res) {
        var sectors = JSON.parse(res.payload);
        expect(sectors.length).to.equal(2);
        expect(sectors[0].id).to.equal(1029442);
        expect(sectors[1].id).to.equal(1040725);
        expect(sectors[1].name).to.equal('FinTech');
        expect(sectors[0].name).to.equal('Big Data');
        server.stop(done);
      });
    });
  });
});