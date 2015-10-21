require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/', function () {

  it('returns the home page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/', function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});


describe('/5', function () {

  it('returns the specific page number', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/5', function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});

describe('/5000', function () {

  it('attempts to access page that does not exist', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/5000', function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});