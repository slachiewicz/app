require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;
var cheerio = require('cheerio');

describe('Attempt to return the list of clients without authorization', function () {

  it('checks status code 302 of /client/list', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/client/list' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});


describe('Attempt to get /client/list with authorization', function () {

  it('return list of clients with status code 200 and return number of clients', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/client/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.payload);
          var clients = $('li');       
          expect(clients.length).to.equal(2);
          server.stop(done);
        });
      });
    });
  });
});

describe('/client/create', function () {

  it('return create a client page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/client/create"
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to return the first client: /client/0 without authorization', function () {

  it('checks status code 302 of /client/0', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/client/0' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Return the first client: /client/0', function () {

  it('checks status code 200 of /client/0', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/client/0",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function(res) {
          expect(err).to.not.exist();
          expect(res.statusCode).to.equal(200);
          server.stop(done);
        });
      });
    });
  });
});

describe('Attempt to return a client with a wrong id: /client/wrongid', function () {

  it('checks status code 404 of /client/wrongid', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/client/wrongid",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {
      server.inject(options, function(res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(404);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to save/update a client: /client/0 without authorization', function () {

  it('checks status code 302 of /client/0', function (done) {

     var options = {
      method: "POST",
      url: "/client/0"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject(options , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Attempt to save/update a client: /client/0 with authorization', function () {

  it('redirect to specific client page after trying to submit with empty input', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/client/0",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {name: '', id: 0}
    };


    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options , function (res) {
          expect(err).to.not.exist();
          expect(res.statusCode).to.equal(302);
          server.stop(done);
        });
      });
    });
  });
});


describe('save/update a client: /client/0 with authorization', function () {

  it('redirect to client/list after updating client', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);  

    var options = {
      method: "POST",
      url: "/client/0",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {name: 'Dwyl-updated', id: 0}
    };


    Server.init(0, function (err, server) {

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options , function (res) {
          expect(err).to.not.exist();
          expect(res.statusCode).to.equal(302);
          server.stop(done);
        });
      });
    });
  });
});