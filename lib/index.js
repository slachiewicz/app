var Assets = require('./assets.js');
var CandidateView = require('./candidateView.js');
var Hapi = require('hapi');
var Home = require('./home.js');
var Handlebars = require('handlebars');
var Inert = require('inert');
var Vision = require('vision');

exports.init = function (port, next) {

  var server = new Hapi.Server();
  server.connection({port: port});

  server.register([Inert, Vision, Home, CandidateView, Assets], function (err) {
     // $lab:coverage:off$
    if (err) {
      return next(err);
    }
    // $lab:coverage:on$
    server.views({
      engines: {
        html: Handlebars
      },
      relativeTo: __dirname + '/../views/',
      path: '.',
      layout: 'default',
      layoutPath: 'layout',
      helpersPath: 'helpers',
      partialsPath: 'partials'
    });
  

    server.start(function (err) {

      return next(err, server);
    });
  });
};