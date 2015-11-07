require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

//change the results per page to have at least 2 pages

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


describe('/1', function () {

  it('returns the specific page number 1', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/1', function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);
      });
    });
  });
});

describe('/2', function () {

  it('returns the specific page number 2', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/2', function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;

        server.stop(done);
      });
    });
  });
});

describe('/-13', function () {

  it('Attempt to access a negative page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/-13', function (res) {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/');

        server.stop(done);
      });
    });
  });
});

describe('/8000', function () {

  it('Attempt to access a page > total page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/8000', function (res) {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/');

        server.stop(done);
      });
    });
  });
});

describe('try to access a wrong route: /wrongparam', function () {

  it('Attempt to access the home page with a wrong parameter', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/wrongparam', function (res) {

        expect(res.statusCode).to.equal(404);

        server.stop(done);
      });
    });
  });
});

//restore env
// process.env.RESULTS_PER_PAGE = resultsPerPage;
