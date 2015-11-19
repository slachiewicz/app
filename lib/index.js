var Authentication = require('./authentication.js');
var Assets = require('./assets.js');
var Api = require('./api.js');
var CandidateView = require('./candidateView.js');
var Hapi = require('hapi');
var Home = require('./home.js');
var Handlebars = require('handlebars');
var Login = require('./login');
var Inert = require('inert');
var Search = require('./search.js');
var Vision = require('vision');
var HapiAuthGoogle = require('hapi-auth-google');
var Permission = require('./permission');

exports.init = function (port, next) {

  var server = new Hapi.Server();
  server.connection({port: port});

  var opts = {
    REDIRECT_URL: '/googleauth',
    scope: 'https://www.googleapis.com/auth/plus.profile.emails.read',
    handler: require('./google_oauth_handler.js')
  };

  server.register([{register: HapiAuthGoogle, options: opts}, Authentication, Inert, Vision, Home, CandidateView, Assets, Api, Search, Login, Permission], function (err) {
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
