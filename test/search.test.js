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

describe('/search endpoint', function () {

  var token =  JWT.sign({ id: "12", "name": "Simon", valid: true}, process.env.JWT_SECRET);

  var redisClient = require('redis-connection')();
  redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}));

    it('Attemps to search with a wrong param for the page number', function (done) {

      Server.init(0, function (err, server) {

        expect(err).to.not.exist();


          server.inject({url: '/search/all/javascript/wrongpage', headers: { cookie: "token=" + token }}, function (res) {

            expect(res.statusCode).to.equal(404);
            server.stop(done);

          });
      });
    });

    it('Attemps to search with page number < 1', function (done) {

      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject({url: '/search/all/javascript/-42', headers: { cookie: "token=" + token }}, function (res) {

          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/');
          server.stop(done);

        });
      });
    });


    it('Attemps to search with page number too big', function (done) {

      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject({url: '/search/all/javascript/5000', headers: { cookie: "token=" + token }}, function (res) {

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

      server.inject({url: '/search/all/javascript/1', headers: { cookie: "token=" + token }}, function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);

      });
    });
  });

  it('returns specific search results for dupont which is one of my favourite', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject({url: '/search/all/dupont/1', headers: { cookie: "token=" + token }}, function (res) {
        console.log(res.payload);
        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);

      });
    });
  });

  it('returns specific search results for skills', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 1;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject({ url: '/search/skill/javascript/1',headers: { cookie: "token=" + token }}, function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);

      });
    });
  });


    it('returns specific search results for names', function (done) {
        var nubersPerPage = process.env.RESULTS_PER_PAGE;
        process.env.RESULTS_PER_PAGE = 1;
      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject({url: '/search/name/dolores/1', headers: { cookie: "token=" + token }}, function (res) {

          expect(res.statusCode).to.equal(200);
          process.env.RESULTS_PER_PAGE = nubersPerPage;
          server.stop(done);

        });
      });
    });

    it('returns empty result', function (done) {
        var nubersPerPage = process.env.RESULTS_PER_PAGE;
        process.env.RESULTS_PER_PAGE = 1;
      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject({url: '/search/name/thisisawrongname/1',headers: { cookie: "token=" + token }}, function (res) {

          expect(res.statusCode).to.equal(200);
          process.env.RESULTS_PER_PAGE = nubersPerPage;
          server.stop(done);

        });
      });
    });

    it('returns empty result', function (done) {
        var nubersPerPage = process.env.RESULTS_PER_PAGE;
        process.env.RESULTS_PER_PAGE = 1;
      Server.init(0, function (err, server) {

        expect(err).to.not.exist();

        server.inject({url: '/search/all/javascript/1', headers: { cookie: "token=" + token }}, function (res) {

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

      server.inject({url: '/search/all/javascript/2', headers: { cookie: "token=" + token }}, function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);

      });
    });
  });

  it('returns specific search results', function (done) {
      var nubersPerPage = process.env.RESULTS_PER_PAGE;
      process.env.RESULTS_PER_PAGE = 3;
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject({url: '/search/all/javascript/1', headers: { cookie: "token=" + token }}, function (res) {

        expect(res.statusCode).to.equal(200);
        process.env.RESULTS_PER_PAGE = nubersPerPage;
        server.stop(done);
        redisClient.end();
      });
    });
  });

});

describe('/search/all/javascript/1', function () {

  it('attempt to access search page without being authenticated', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/search/all/javascript/1', function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});
