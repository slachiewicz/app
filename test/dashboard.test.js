var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var cheerio = require('cheerio');

var token =  JWT.sign({ id: '12', "name": "Simon", valid: true, "firstname": "Simon"}, process.env.JWT_SECRET);

describe('Attempt to access dashboard without authorization', function () {

  it('checks status code to be 302 redirection', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/dashboard' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('access dashboard, when user is authenticated', function () {
  it('returns status code 200', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/dashboard', headers: { cookie: "token=" + token }}, function (res) {
        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});

describe('access dashboard of Simon with his candidates', function () {

  it('return the dashboard with candidates with submitted status', function (done) {
    var tokenSimon =  JWT.sign({ id: "12", "name": "Simon", valid: true, "firstname": "Simon"}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/dashboard', headers: { cookie: "token=" + tokenSimon }}, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        console.log($)
        var profile = $('.submitted-list .contact');
        console.log('-----', profile);
        expect(profile.length).to.be.above(0);
        server.stop(done);

      });
    });
  });
});

describe('access dashboard of Simon with his candidates', function () {

  it('return the dashboard with candidates with interview status', function (done) {
    var tokenSimon =  JWT.sign({ id: 12, "name": "Simon", valid: true, "firstname": "Simon"}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/dashboard', headers: { cookie: "token=" + tokenSimon }}, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);
        var profile = $('.interview-list .contact');
        expect(profile.length).to.be.above(0);
        server.stop(done);

      });
    });
  });
});

describe('access dashboard of Simon with wrong credentials', function () {

  it('return the dashboard with empty profiles', function (done) {
    var tokenSimon =  JWT.sign({ id: '12', "name": "Simon", valid: true, "firstname": "Sandra"}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject({url: '/dashboard', headers: { cookie: "token=" + tokenSimon }}, function (res) {
        expect(res.statusCode).to.equal(200);

        server.stop(done);
      });
    });
  });
});
