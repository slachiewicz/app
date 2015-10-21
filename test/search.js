// var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/search/france/2', function () {

  it('returns specific search results', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/france/2', function (res) {

        expect(res.statusCode).to.equal(200);
        server.stop(done);

      });
    });
  });
});

describe('/search/france/0', function () {

  it('Attempt to search with a page < 1', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/france/0', function (res) {

        expect(res.statusCode).to.equal(200);
        server.stop(done);

      });
    });
  });
});

describe('/search/france/1', function () {

  it('Attempt to search with a page < 1', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/france/1', function (res) {

        expect(res.statusCode).to.equal(200);
        server.stop(done);

      });
    });
  });
});

describe('/search/france/5000', function () {

  it('Attempt to search with a page bigger than the max pages', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/france/5000', function (res) {

        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});
