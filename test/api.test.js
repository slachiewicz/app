require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

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
        setTimeout(server.inject('/candidate/' + res.payload , function (res) {

        expect(res.statusCode).to.equal(200);

        var $ = cheerio.load(res.payload);

        expect($('.fullname').text()).to.equal("David Dupont");

        server.stop(done);
    }), 3000);

        // server.stop(done);

      });

    });

  });

    it('create profile', function (done) {

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

        setTimeout(server.inject('/candidate/' + res.payload , function (res) {

        expect(res.statusCode).to.equal(200);

        var $ = cheerio.load(res.payload);

        expect($('.fullname').text()).to.equal("Maria Dolores");

        server.stop(done);

        }), 3000);

      });

    });
  });

});
