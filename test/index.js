var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Server = require('../lib/index.js');
var Home = require('../lib/home.js');

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var it = lab.test;

console.log('testing');
it('starts server and return an instance of Hapi server', function (done) {
    console.log('testing787878');
  Server.init(0, function (err, server) {

    expect(err).to.not.exist();
    expect(server).to.be.instanceof(Hapi.Server);
console.log('testing78787800000000000000000');
    server.stop(done);
  });

});

it('handles register plugin errors', { parallel: false }, function (done) {

    Home.register = function (server, options, next) {

        return next(new Error('failed plugin'));
    };

    Home.register.attributes = {

        name: 'fake home plugin'
    };

    Server.init(0, function (err, server) {

        expect(err).to.exist();
        expect(err.message).to.equal('failed plugin');

        done();
    });

});
