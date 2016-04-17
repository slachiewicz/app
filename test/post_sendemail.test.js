'use strict';
//profile  in erquest.quty.credential
require('env2')('.env');
const es = require('../lib/es.js');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib/index.js');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;


describe('Attempt to send email without being authenticated', function () {

  it('it redirect to the login page', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      const options = {
        method: "POST",
        url: "/sendemail"
      }

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

//nock gmail?
//'https://www.googleapis.com/upload/gmail/v1/users/{userId}/messages/send',

// describe('send an email', function () {
//
//   it('send an email', function (done) {
//
//     Server.init(0, function (err, server) {
//
//       var accessToken =  JWT.sign({ id: '12', name: "Simon", valid: true, firstname: "Simon"}, process.env.JWT_SECRET);
//
//       var options = {
//         method: "POST",
//         url: "/sendemail"
//         payload: {
//           candidate: {
//             id: "1"
//           },
//           fileContent: "base64 content",
//           fileType: "SAMPLE",
//           name: "cv.pdf",
//           contentType: "application\/octet-stream",
//           description: "CV",
//           type: "document"
//         }
//       };
//
//       server.inject('/googleauth?code=oauth2codehere', function (res) {
//
//         expect(res.statusCode).to.equal(200);
//         expect(res.payload.indexOf('something went wrong')).to.be.above(-1);
//         server.stop(done);
//       });
//     });
//   });
// });
