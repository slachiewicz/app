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

describe('/query', function () {

  it('attempt to access search page without being authenticated', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/query', function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('return a search results, when user is authenticated', function () {
  it('returns specific search results', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=javascript&fullname=Anita&location=London', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('return a search results, when user is authenticated and with no precise page number', function () {
  it('returns specific search results', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query?job=javascript&fullname=Anita&location=London', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('attempt to access a search page with wrong page parameter and return 404', function () {
  it('returns 404', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/wrongNumber?job=javascript&fullname=Anita&location=London', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(404);
        server.stop(done);
      });
    });
  });
});

describe('attempt to access a search page with page number < 1', function () {
  it('redirect to home page', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/-1?job=javascript&fullname=Anita&location=London', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('search with empty job, empty fullname', function () {
  it('returns search results', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=&fullname=&location=London', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('search with job, fullname and empty location', function () {
  it('returns search results', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=developer&fullname=Anita&location=', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});


describe('attempt to search with empty job, empty fullname and empty location and redirect to home page', function () {
  it('redirect  to home page', function (done) {
            
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=&fullname=&location=', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('search for candidate who is in my favourite list', function () {

  it('returns search results', function (done) {
    var tokenSimon =  JWT.sign({ id: '12', "name": "Simon", valid: true}, process.env.JWT_SECRET);
       
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=&fullname=Oba&location=', headers: { cookie: "token=" + tokenSimon }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('search for candidate who is NOT in my favourite list', function () {

  it('returns search results', function (done) {
    var tokenSimon =  JWT.sign({ id: '12', "name": "Simon", valid: true}, process.env.JWT_SECRET);
       
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=&fullname=Manuel&location=', headers: { cookie: "token=" + tokenSimon }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('search for candidate who doesn\'t have fullname' , function () {

  it('returns search results', function (done) {
     
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=&fullname=&location=Bordeaux', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('attempt to access search page when a number page is too big' , function () {

  it('redirect to home page', function (done) {
     
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/790?job=&fullname=&location=Bordeaux', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('return multiple results' , function () {

  it('return search results', function (done) {
    var numbersPerPage = process.env.RESULTS_PER_PAGE;
    process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/1?job=&fullname=&location=Barcelona', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = numbersPerPage;
        server.stop(done);
      });
    });
  });
});

describe('return multiple results on specific page 2' , function () {

  it('return search results', function (done) {
    var numbersPerPage = process.env.RESULTS_PER_PAGE;
    process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/query/2?job=&fullname=&location=Barcelona', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = numbersPerPage;
        server.stop(done);
      });
    });
  });
});