var es = require('../lib/es.js');
require('env2')('.env');
var Code = require('code');
var Lab = require('lab');
var Server = require('../lib/index.js');
var JWT = require('jsonwebtoken');
var cheerio = require('cheerio');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


var token =  JWT.sign({ id: "12", "name": "Simon", valid: true}, process.env.JWT_SECRET);
describe('/notes/1', function () {

  it('attempt to submit note without being authenticated', function (done) {

    var options = {
      method: "POST",
      url: "/notes/1"
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated', function () {

  it('redirects to the candidate page with new note', function (done) {

    var notes = {
      status: 'submitted',
      company: 'Ltd',
      notes: 'this candidate is awesome'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('test that class notes-item exist and there is 1 note ', function () {

  it('check if notes-item with 1 element is on the candidate page', function (done) {

    var options = {
      method: "GET",
      url: "/candidate/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);

        expect($('.notes-item').length).to.equal(2);

        server.stop(done);
      });
    });
  });
});

describe('attempt to submit the empty notes when authenticated', function () {

  it('redirects to the candidate page without saving empty note', function (done) {

    var notes = {
      status: undefined,
      company: '',
      notes: ''
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status undefines, company and notes are defined', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: undefined,
      company: 'LTd',
      notes: 'something'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(302);
        server.stop(done);
      });
    });
  });
});

describe('test that class notes-item exist and there are 2 notes ', function () {

  it('check if notes-item with 2 elements are on candidate page', function (done) {

    var options = {
      method: "GET",
      url: "/candidate/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true}
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {
        expect(res.statusCode).to.equal(200);
        var $ = cheerio.load(res.payload);

        expect($('.notes-item').length).to.equal(3);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status submitted, notes are defined and company field is empty', function () {

  it('save the nots and redirects to the candidate page', function (done) {

    var notes = {
      status: 'submitted',
      company: '',
      notes: 'something'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status submitted, company is defined and notes are empty', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: 'submitted',
      company: 'Brains',
      notes: ''
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status submitted, company and notes are defined', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: 'submitted',
      company: 'Brains',
      notes: 'notes'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status \'interview\', company , notes are defined', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: 'interview',
      company: 'Brains',
      notes: 'notes'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status empty, company and notes are defined', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: '',
      company: 'Brains',
      notes: 'notes'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        server.stop(done);
      });
    });
  });
});

describe('submit the note when authenticated with status not defined, company is not defined and note is defiend', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: '',
      company: '',
      notes: 'notes'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        setTimeout(function(){server.stop(done)}, 2000);
      });
    });
  });
});



describe('submit the note when authenticated with status \'interview\', company and note are empty', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: 'interview',
      company: '',
      notes: ''
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        setTimeout(function(){server.stop(done)}, 2000);
      });
    });
  });
});

describe('submit the note when authenticated with status interview, company is empty and note is defiend', function () {

  it('save the note and redirects to the candidate page', function (done) {

    var notes = {
      status: 'interview',
      company: '',
      notes: 'notes'
    };

    var options = {
      method: "POST",
      url: "/notes/1",
      headers: { cookie: "token=" + token },
      credentials: { id: "12", "name": "Simon", valid: true},
      payload: notes
    };

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(302);

        setTimeout(function(){server.stop(done)}, 2000);
      });
    });
  });
});




describe('update the profile with the id 1', function () {

  it('updates profile david', function (done) {

    Server.init(0, function (err, server) {

      expect(err).to.not.exist();

      var profile = require('./fixtures/david-dupont.json');

      var options = {
        method: 'POST',
        url: '/profile',
        payload: profile
    };

      server.inject(options, function (res) {

        expect(res.statusCode).to.equal(200);

        var tokenSimon =  JWT.sign({ id: '13', "name": "Simon", valid: true}, process.env.JWT_SECRET);

        var optionsCandidate = {
          method: "GET",
          url: "/candidate/" + res.payload,
          headers: { cookie: "token=" + tokenSimon }
        };
          server.inject(optionsCandidate , function (res) {
            expect(res.statusCode).to.equal(200);
            setTimeout(function(){server.stop(done)}, 2000);
          });
      });
    });
  });
});

describe('The list of notes should not be empty after a profile update', function () {

  it('checks status code 200 of /candidate/1 and right format of the date', function (done) {
    var token =  JWT.sign({ id: 12, "name": "Simon", valid: true}, process.env.JWT_SECRET);

    var options = {
      method: "GET",
      url: "/candidate/1",
      headers: { cookie: "token=" + token },
    };

    Server.init(0, function (err, server) {
      server.inject(options, function(res) {
        expect(err).to.not.exist();
        expect(res.statusCode).to.equal(200);
        var currentDate = new Date(); 
        var today = currentDate.getDate() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + currentDate.getFullYear();
        var $ = cheerio.load(res.payload);
        expect(($('.notes-item strong')[0].children[0].data).indexOf(today)).to.be.above(-1);
        expect($('.notes-item strong').length).to.be.above(1);
        server.stop(done);
      });
    });
  });
});

