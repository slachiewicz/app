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

describe('Attempt to access email page without authorization', function () {

  it('checks status code to be 302 redirection', function (done) {

    var options = {
      method: "POST",
      url: "/email"
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

describe('Access the email when authenticated', function () {

  it('render the email page', function (done) {

    var emails = {email: '{"email":"fakecontact1@gmail.com","id":"1"}'};

    var options = {
      method: "POST",
      url: "/email",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true, "firstname": "Simon", image: {url:'/urlImage'}},
      payload: emails
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});

describe('Access the email when authenticated', function () {

  it('render the email page', function (done) {

    var emails = {email: ['{"email":"fakecontact1@gmail.com","id":"1"}']};

    var options = {
      method: "POST",
      url: "/email",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true, "firstname": "Simon", image: {url:'/urlImage'}},
      payload: emails
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
})

describe('Trying to redirect to /email page without submitting emails', function () {

  it('redirects to the home page', function (done) {

    var emails = undefined;

    var options = {
      method: "POST",
      url: "/email",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true, "firstname": "Simon"},
      payload: emails
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});
