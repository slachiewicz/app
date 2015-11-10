require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('Return the first candidate: /candidate/1', function () {

  it('checks status code 200 of /candidate/1', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/candidate/1' , function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});
