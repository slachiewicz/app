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

    //mock the upload of the file
    var nock = require('nock');
    nock('https://www.googleapis.com')
      .post('/upload/drive/v3/files?uploadType=multipart')
      .reply(200, {id: 'theIdOfTheFile'});
    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "POST",
        url: "/cv/create",
        payload: {
          candidate: {
            id: "1"
          },
          fileContent: "base64 content",
          fileType: "SAMPLE",
          name: "cv.pdf",
          contentType: "application\/octet-stream",
          description: "CV",
          type: "document"
        }
      };

      server.inject(options, function (res) {

        expect(res.payload).to.equal('theIdOfTheFile');
        //clear nock
        server.stop(done);
      });
    });
  });
});

describe('/cv/create but fail to upload the CV to google Drive', function () {

  it('Attempt to create upload a cv', function (done) {

    //mock the upload of the file
    var nock = require('nock');
    nock('https://www.googleapis.com')
      .post('/upload/drive/v3/files?uploadType=multipart')
      .reply(500, null);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var options = {
        method: "POST",
        url: "/cv/create",
        payload: {
          candidate: {
            id: "1"
          },
          fileContent: "base64 content",
          fileType: "SAMPLE",
          name: "cv.pdf",
          contentType: "application\/octet-stream",
          description: "CV",
          type: "document"
        }
      };

      server.inject(options, function (res) {

        expect(parseInt(res.payload)).to.equal(500);

        server.stop(done);
      });
    });
  });
});
