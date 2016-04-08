// require('env2')('.env');
// var es = require('../lib/es.js');
// var Code = require('code');
// var Lab = require('lab');
// var Server = require('../lib/index.js');
// var JWT = require('jsonwebtoken');
// //
// // var cheerio = require('cheerio');
// var lab = exports.lab = Lab.script();
// var describe = lab.experiment;
// var expect = Code.expect;
// var it = lab.test;
//
// describe('accessing api /profile and view candidate profile that has viewedBy key', function () {
//
//     it('update the viewedBy key on profile anita', function (done) {
//
//     Server.init(0, function (err, server) {
//
//       expect(err).to.not.exist();
//
//       var profile = require('./fixtures/anita.json');
//       var options = {
//         method: 'POST',
//         url: '/profile',
//         payload: profile
//     };
//
//       server.inject(options, function (res) {
//
//         expect(res.statusCode).to.equal(200);
//
//         var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);
//
//         var optionsCandidate = {
//           method: "GET",
//           url: "/candidate/" + res.payload,
//           headers: { cookie: "token=" + token }
//         };
//
//         var redisClient = require('redis-connection')();
//         redisClient.set(12, JSON.stringify({ id: 12, "name": "Simon", valid: true}), function (err, res) {
//           setTimeout(server.inject(optionsCandidate, function (res) {
//
//         console.log(res);
//
//           server.stop(done);
//
//           }), 3000);
//
//         });
//       });
//     });
//   });
//
// });
