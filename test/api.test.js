require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var cheerio = require('cheerio');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('api /profile', function () {

  it('updates profile', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var profile = require('./fixtures/david-dupont.json');

      var options = {
        method: 'POST',
        url: '/profile',
        payload: profile
    };

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(200);

        var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

        var optionsCandidate = {
          method: "GET",
          url: "/candidate/" + res.payload,
          headers: { cookie: "token=" + token }
        };

        var redisClient = require('redis-connection')();
        redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
          setTimeout(server.inject(optionsCandidate , function (res) {

          expect(res.statusCode).to.equal(200);

          var $ = cheerio.load(res.payload);

          expect($('.fullname').text()).to.equal("David Dupont");

          server.stop(done);
          
          }), 3000);

        });

        // server.stop(done);

      });

    });

  });

    it('create profile Maria', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var profile = require('./fixtures/maria-dolores.json');
      var options = {
        method: 'POST',
        url: '/profile',
        payload: profile
    };

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(200);

        var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

        var optionsCandidate = {
          method: "GET",
          url: "/candidate/" + res.payload,
          headers: { cookie: "token=" + token }
        };

        var redisClient = require('redis-connection')();
        redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
          setTimeout(server.inject(optionsCandidate, function (res) {

          expect(res.statusCode).to.equal(200);

          var $ = cheerio.load(res.payload);

          expect($('.fullname').text()).to.equal("Maria Dolores");

          server.stop(done);
          
          }), 3000);

        });
      });

    });
  });

});
