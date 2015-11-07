var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/search endpoint', function () {

    it('Attemps to search with a wrong param for the page number', function (done) {

      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject('/search/javascript/wrongpage', function (res) {

          expect(res.statusCode).to.equal(404);
          server.stop(done);

        });
      });
    });

    it('Attemps to search with page number < 1', function (done) {

      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject('/search/javascript/-42', function (res) {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/');
          server.stop(done);

        });
      });
    });

    it('Attemps to search with page number too big', function (done) {

      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject('/search/javascript/5000', function (res) {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/');
          server.stop(done);

        });
      });
    });

  it('returns specific search results', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/javascript/1', function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);

      });
    });
  });

  it('returns specific search results', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/javascript/2', function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);

      });
    });
  });
});
