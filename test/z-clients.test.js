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

  it('checks status code 302 of /clients/list', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/clients/list' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});


describe('Attempt to get /clients/list with authorization', function () {

  it('return list of clients with status code 200 and return number of clients', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/clients/list",
        headers: { cookie: "token=" + token },
        credentials: { id: "12", "name": "Simon", valid: true}
      };

      var redisClient = require('redis-connection')();

      redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
        server.inject(options, function (res) {
          expect(res.statusCode).to.equal(200);
          var $ = cheerio.load(res.payload);
          var clients = $('li');       
          expect(clients.length).to.equal(3);
          server.stop(done);
        });
      });
    });
  });
});

describe('/clients/create', function () {

  it('return create a client page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/clients/create"
      };

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Attempt to return the first client: /clients/0 without authorization', function () {

  it('checks status code 302 of /clients/0', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      server.inject('/clients/0' , function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('Return the first client: /clients/0', function () {

  it('checks status code 200 of /clients/0', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/clients/0",
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

describe('Attempt to return a client with a wrong id: /clients/wrongid', function () {

  it('checks status code 404 of /clients/wrongid', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/clients/wrongid",
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

describe('Attempt to save/update a client: /clients/0 without authorization', function () {

  it('checks status code 302 of /clients/0', function (done) {

     var options = {
      method: "POST",
      url: "/clients/0"
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

describe('Attempt to save/update a client: /clients/0 with authorization', function () {

  it('redirect to specific client page after trying to submit with empty input', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/clients/0",
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

describe('save/update a client: /clients/0 with authorization', function () {

  it('redirect to client/list after updating client', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);  

    var options = {
      method: "POST",
      url: "/clients/3",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {name: 'New-One', id: 3}
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

describe('Attempt to create a client: /clients/create without authorization', function () {

  it('checks status code 302 of /clients/create', function (done) {

     var options = {
      method: "POST",
      url: "/clients/create"
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

describe('Attempt to create a client: /clients/create with authorization', function () {

  it('redirects to client create form page after trying to submit an empty input', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "POST",
      url: "/clients/create",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {companyName: ''}
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

describe('create a client: /clients/create with authorization', function () {

  it('redirect to client/list after creating client', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);  

    var options = {
      method: "POST",
      url: "/clients/create",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: {companyName: 'WWW'}
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

describe('Attempt to delete a client: /clients/delete/3 without authorization', function () {

  it('checks status code 302 for redirection', function (done) {

     var options = {
      method: "POST",
      url: "/clients/delete/3"
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

describe('delete a client: /clients/delete/3 with authorization', function () {

  it('redirect to client/list after deleting a client', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);  

    var options = {
      method: "POST",
      url: "/clients/delete/3",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
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