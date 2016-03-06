require('env2')('.env');
var es = require('../lib/es.js');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('/cv/create cv', function () {

  it('Create a cv', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/cv/create",
        payload: {
                  candidate: {
                    id: 1
                  },
                  externalID: "Resume",
                  fileContent: "The content of the file",
                  fileType: "SAMPLE",
                  name: "file.txt",
                  contentType: "application/octet-stream",
                  description:"CV",
                  type: "document"
                }
      };

      server.inject(options, function (res) {
        es.get({
          index: process.env.ES_INDEX,
          type: process.env.ES_TYPE_CV,
          id: res.payload
        }, function (err, response) {
          expect(res.statusCode).to.equal(200);
          expect(response._source.payload.name).to.equal('file.txt');
          expect(response._source.payload.type).to.equal('document');
          server.stop(done);
        })
      });
    });
  });
});
