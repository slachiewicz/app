require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/favourite not authentication', function () {

  it('refuse to update favorite if not authenticated', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "POST",
        url: "/favourite"
      };

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(401);

        server.stop(done);
      });
    });
  });
});

describe('/favourite the candidate 1', function () {

  it('Favorite ok: had my id to the Favorite candidate list', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/favourite",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {id: 1}
    };

     Server.init(0, function (err, server) {
      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(200);
          server.stop(done);

        });
      });
    });
  });
});

describe('/favourite the candidate 4', function () {

  it('Favorite ok: had my id to the Favorite candidate 4 list', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/favourite",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {id: 4}
    };

     Server.init(0, function (err, server) {
      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(200);
          server.stop(done);

        });
      });
    });
  });
});

describe('/favourite the candidate 4', function () {

  it('Favorite ok: javascript disable, old school request', function (done) {

    var token =  JWT.sign({ id: 13, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/favourite",
      headers: { cookie: "token=" + token },
      credentials: { id: "13", "name": "Simon", valid: true},
      payload: {id: 4, javascriptDisabled: 'true'}
    };

     Server.init(0, function (err, server) {
      var redisClient = require('redis-connection')();

      redisClient.set(13, JSON.stringify({ id: 13, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(302);
          server.stop(done);

        });
      });
    });
  });
});

describe('/favourite get my list error not authorized', function () {

  it('Attempt to access favourite list without authentication', function (done) {


    var options = {
      method: "GET",
      url: "/favourite",
    };

     Server.init(0, function (err, server) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(401);
          server.stop(done);
        });
    });
  });
});


describe('/favourite return list of my favorite', function () {

  it('Favorite ok authentication', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/favourite",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
    };

     Server.init(0, function (err, server) {
      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(200);
          server.stop(done);

        });
      });
    });
  });
});


describe('/favourite return list of my favorite', function () {

  it('Favorite ok authentication and get the first page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/favourite/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
    };

     Server.init(0, function (err, server) {
      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(200);
          server.stop(done);

        });
      });
    });
  });
});
