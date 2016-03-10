require('env2')('.env');
var JWT = require('jsonwebtoken');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('attempt to access /jobs/list without authorization', function () {

  it('redirects to the login page', function (done) {

    Server.init(0, function (err, server) {
   
      var options = {
        method: "GET",
        url: "/jobs/list"
      };

      server.inject(options, function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302)
        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /jobs/list when authenticated with header accepts text/html', function () {

  it('return list of jobs with status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/list",
        headers: { cookie: "token=" + token, accept: 'text/html'},
        credentials: { id: "12", "name": "Simon", valid: true}
      };
     
      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    
    });
  });
});

describe('Attempt to get /jobs/list when authenticated and header accepts application/json', function () {

  it('return list of jobs with status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/list",
        headers: { cookie: "token=" + token, accept: 'application/json'},
        credentials: { id: "12", "name": "Simon", valid: true}
      };
 
      server.inject(options, function (res) {
        var payload = JSON.parse(res.payload);
        expect(payload.length).to.equal(1);
        expect(payload[0].title).to.equal('Node.js Developer');
        server.stop(done);
      });
    
    });
  });
});

describe('attempt to access /jobs/create without authorization', function () {

  it('redirects to the login page', function (done) {

    Server.init(0, function (err, server) {
   
      var options = {
        method: "GET",
        url: "/jobs/create"
      };

      server.inject(options, function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302)
        server.stop(done);
      });
    });
  });
});

describe('Attempt to get /jobs/create when authenticated', function () {

  it('return status code 200', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();
      var options = {
        method: "GET",
        url: "/jobs/create",
        headers: { cookie: "token=" + token},
        credentials: { id: "12", "name": "Simon", valid: true}
      };
     
      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        server.stop(done);
      });
    
    });
  });
});

describe('attempt to create a job without authorization', function () {

  it('redirects to the login page', function (done) {

    Server.init(0, function (err, server) {
   
      var options = {
        method: "POST",
        url: "/jobs/create"
      };

      server.inject(options, function (res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(302)
        server.stop(done);
      });
    });
  });
});

describe('Attempt to create a job /jobs/create when authenticated with wrong validation', function () {

  it('return status code 302 ', function (done) {

    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var job = {
        title: '',
        startDate: '2016-08-10',
        dateEnd: '2016-09-10'
      }
      var options = {
        method: "POST",
        url: "/jobs/create",
        headers: { cookie: "token=" + token},
        credentials: { id: "12", "name": "Simon", valid: true},
        payload: job

      };
     
      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    
    });
  });
});


// describe('Create a job on POST jobs/create', function () {

//   it('Create a job', function (done) {

//     var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

//     Server.init(0, function (err, server) {

//       var payloadObj = {
//         title: 'Node.js Developer',
//         employmentType: 'Permanent',
//         owner: 'Mario Bros',
//         client: 'Something',
//         customText1: 'Junior',     
//         customText2: 'REquired',
//         customText3: 'Required',
//         customTextBlock1: '',
//         customText5: '',
//         customText6: '',
//         customText7: '',
//         customText8: '',
//         customTextBlock2: '',
//         customText11: '',
//         startDate: '2016-08-10',
//         dateEnd: '2016-08-10',
//         salary: '',
//         payRate: '',
//         customText12: 'Required',
//         description: 'some description'
//       }

//       expect(err).to.not.exist();
//       var options = {
//         method: "POST",
//         url: "/jobs/create",
//         headers: { cookie: "token=" + token},
//         credentials: { id: "12", "name": "Simon", valid: true},
//         payload: payloadObj
//       };

//       server.inject(options, function (res) {
//        console.log(res.payload);
       
//         // expect(res.statusCode).to.equal(200);
//         // expect(res.payload.title).to.equal('Node.js Developer');
//         // expect(res.payload.employmentType).to.equal('Permanent');
//         // expect(res.payload.owner).to.equal('Mario Bros');
//         server.stop(done);
//       });
//     });
//   });
// });
