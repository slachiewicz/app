require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/getgoogleloginurl', function () {

  it('return the google url', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/getgoogleloginurl', function (res) {

        var url = res.payload;

        var expected = 'https://accounts.google.com/o/oauth2/auth';

        expect(res.statusCode).to.equal(200);

        expect(url.indexOf(expected)).to.be.above(-1);

        server.stop(done);
      });
    });
  });
});


