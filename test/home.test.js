require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

//change the results per page to have at least 2 pages

// describe('/', function () {

//   it('returns the home page', function (done) {

//     Server.init(0, function (err, server) {

//       expect(err).to.not.exist();

//       server.inject('/', function (res) {

//         expect(res.statusCode).to.equal(200);

//         server.stop(done);
//       });
//     });
//   });
// });

describe('/', function () {

  it('redirect not authenticated user to the login page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject('/', function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('/', function () {

  it('Attempt to access restricted content with WRONG Token', function (done) {

    var token =  "wrongeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXN0bmFtZSI6IkFsZXgiLCJpbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnP3N6PTUwIiwiaWQiOiIxMDA3NjAxNTIyNTQ3NzkwNjE1OTQiLCJhZ2VudCI6InNob3QiLCJpYXQiOjE0NDc4NTA0NjN9.zcimChNyt0xjig1gtcRjk3neyXBaB3TP5KD-B1Tcxy8"  //JWT.sign({ id: 123, "name": "Charlie" }, secret);

    var options = {
      method: "GET",
      url: "/",
      headers: { cookie: "token=" + token }
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function(res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);

      });
    });
  });
});

describe('/', function () {

  it('Authentication ok: right JWT token and valid property to true', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/",
      headers: { cookie: "token=" + token },
      credentials: { id: 12, "name": "Simon", valid: true}
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

describe('/', function () {

  it('Authentication failed: right JWT token but valid property is false', function (done) {

    var token =  JWT.sign({ id: 123, "name": "Charlie"}, process.env.JWT_SECRET);
    var options = {
      method: "GET",
      url: "/",
      headers: { cookie: "token=" + token }
    };

     Server.init(0, function (err, server) {
      var redisClient = require('redis-connection')();

      redisClient.set(123, JSON.stringify({ id: 123, "name": "Charlie", valid: false}), function (err, res) {
        server.inject(options, function(res) {
          expect(res.statusCode).to.equal(302);
          server.stop(done);
        });
      });
    });
  });
});

//id not defined in Redis
describe('/', function () {

  it("Authentication failed: right token but user doesn't exist in Redis", function (done) {

    var token =  JWT.sign({ id: 42, "name": "Charlie"}, process.env.JWT_SECRET);
    var options = {
      method: "GET",
      url: "/",
      headers: { cookie: "token=" + token }
    };

     Server.init(0, function (err, server) {

      server.inject(options, function(res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
        //get the current redis connection and close it

      });
    });
  });
});


describe('/1', function () {

  it('returns the specific page number 1', function (done) {

    var nubersPerPage = process.env.RESULTS_PER_PAGE;
    process.env.RESULTS_PER_PAGE = 1;

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/1",
      headers: { cookie: "token=" + token }
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(200);
          process.env.RESULTS_PER_PAGE = nubersPerPage;
          server.stop(done);
        });
      });
    });
  });
});



describe('/2', function () {

  it('returns the specific page number 2', function (done) {
    var nubersPerPage = process.env.RESULTS_PER_PAGE;
    process.env.RESULTS_PER_PAGE = 1;

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/2",
      headers: { cookie: "token=" + token }
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(200);
          process.env.RESULTS_PER_PAGE = nubersPerPage;
          server.stop(done);
        });
      });
    });
  });
});

describe('/-13', function () {

  it('Attempt to access a negative page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/-13",
      headers: { cookie: "token=" + token }
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/');
          server.stop(done);
        });
      });
    });
  });
});

describe('/8000', function () {

  it('Attempt to access a page > total page', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/8000",
      headers: { cookie: "token=" + token }
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(302);
          expect(res.headers.location).to.equal('/');
          server.stop(done);
        });
      });
    });
  });
});

describe('try to access a wrong route: /wrongparam', function () {

  it('Attempt to access the home page with a wrong parameter', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/wrongparam",
      headers: { cookie: "token=" + token }
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var redisClient = require('redis-connection')();
      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {

          expect(res.statusCode).to.equal(404);
          server.stop(done);

        });
      });
    });
  });
});

//restore env
// process.env.RESULTS_PER_PAGE = resultsPerPage;
