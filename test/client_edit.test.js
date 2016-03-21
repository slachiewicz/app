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

describe('Attempt to return the update/edit view client page without authorization', function () {

  it('checks status code 302 of /clients/edit/1', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/clients/edit/1' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /clients/edit/1 with authorization', function () {

  it('return form for edit client ', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/clients/edit/1",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.payload);
          var clientInputs = $('.client-info-create input');
          expect(clientInputs['0'].attribs.value).to.equal('1');
          
          server.stop(done);
        });
      });
    });
  });
});
