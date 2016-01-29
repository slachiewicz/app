var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');
var cheerio = require('cheerio');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test
var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

describe('/connected/Anita%20Czapla', function () {

  it('attempt to access search page without being authenticated', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/connected/Anita%20Czapla', function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('redirect to a connected results, when user is authenticated', function () {
  it('returns status code 200', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/connected/Anita%20Czapla', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(302);
      
        server.stop(done);
      });
    });
  });
});

describe('attempt to access a connected page with page number < 1', function () {
  it('redirect to home page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/connected/Anita%20Czapla/-1', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('attempt to access a connected page with wrong page parameter and return 404', function () {
  it('returns 404', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/connected/Simon%20LAb/wrongParam', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(404);
        server.stop(done);
      });
    });
  });
});

describe('search for Simon Lab connections', function () {

  it('return the home page with connections of Simon', function (done) {
    var tokenSimon =  JWT.sign({ id: '12', "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/connected/Simon%20Lab/1', headers: { cookie: "token=" + tokenSimon }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('attempt to access search page when a page is greater than 1' , function () {

  it('return the home page', function (done) {
    var numbersPerPage = process.env.RESULTS_PER_PAGE;
    process.env.RESULTS_PER_PAGE = 1;

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/connected/Simon%20Lab/2', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = numbersPerPage;
        server.stop(done);
      });
    });
  });
})

describe('return multiple results' , function () {

  it('return the home page', function (done) {
    var numbersPerPage = process.env.RESULTS_PER_PAGE;
    process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/connected/Simon%20Lab/1', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = numbersPerPage;
        server.stop(done);
      });
    });
  });
});