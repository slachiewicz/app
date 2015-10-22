require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/candidate/{id}', function () {

  it('checks the route /candidate returns status code 200 when requested', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/candidate/AVCJ7hbBV1bOM0knczjS' , function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});
