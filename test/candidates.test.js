require('env2')('.env');
var es = require('../lib/es.js');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/candidates/create candidate', function () {

  it('Create a candidate', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/candidates/create",
        payload: {
          firstName: "Borislav",
          lastName: "Shekerov",
          email: "boris@example.com",
          phone: "1111111111",
          jobID: 1,
          linkedInURL: "https://uk.linkedin.com/in/borislav-shekerov-a7800990",
          comments: "Testing",
          skillset: "Marketing",
          name: "Borislav Shekerov",
          source: "Company Website"
      }
    };

      server.inject(options, function (res) {
        console.log('res', res);

        setTimeout(function () {
          es.get({
          index: process.env.ES_INDEX,
          type: process.env.ES_TYPE_TOAD,
          id: res.payload
        }, function (err, response) {
          console.log('----',response)
          expect(res.statusCode).to.equal(200);
          expect(response._source.payload.name).to.equal('Borislav Shekerov');
          server.stop(done);
        });
        }, 2000);
        

      });
    });
  });
});