require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('/jobs/list', function () {

  it('return list of jobs in html format', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/list",
        headers: { accept: 'text/html' }
      };


      server.inject(options, function (res) {
        expect(res.payload).to.equal('html list of jobs')
        server.stop(done);
      });
    });
  });
});

describe('/jobs/list json format', function () {

  it('return list of jobs in json format', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/list",
        headers: { accept: 'application/json' }
      };


      server.inject(options, function (res) {
        var jobs = JSON.parse(res.payload)
        expect(jobs.length).to.equal(1);
        expect(jobs[0].id).to.equal(1);
        expect(jobs[0].title).to.equal('Node.js Developer');
        server.stop(done);
      });
    });
  });
});

describe('/jobs/create get', function () {

  it('return the form to create a job', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/create"
      };


      server.inject(options, function (res) {
        //not login
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    });
  });
});


describe('/jobs/create post', function () {

  it('Create a job', function (done) {

    Server.init(0, function (err, server) {

      var payloadObj = {
        title: 'Node.js Developer',
        employmentType: 'Permanent',
        owner: 'Mario Bros',
        customText1: 'Junior',     
        customText2: '',
        customText3: '',
        customTextBlock1: '',
        customText5: '',
        customText6: '',
        customText7: '',
        customText8: '',
        customTextBlock2: '',
        customText11: '',
        startDate: '',
        dateEnd: '',
        salary: '',
        payRate: '',
        customText12: ''
      }

      expect(err).to.not.exist();
      var options = {
        method: "POST",
        url: "/jobs/create",
        payload: payloadObj
      };

      server.inject(options, function (res) {
        var payload = JSON.parse(res.payload);
        expect(res.statusCode).to.equal(200);
        expect(payload.title).to.equal('Node.js Developer');
        expect(payload.employmentType).to.equal('Permanent');
        expect(payload.owner).to.equal('Mario Bros');
        server.stop(done);
      });
    });
  });
});
