var statusHelper = require('../lib/helpers/generateStatus.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('Genereate status from a list of notes', function () {

  it('return the right status from the notes', function (done) {

      //the last item of the array is the most recent
      var notes = [
        { status: 'interview',
          company: 'FAC',
          notes: 'Good candidate',
          author: 'Anita'
        },
        { status: undefined,
          company: 'FAC',
          notes: 'Good candidate again',
          author: 'Anita'
        },
        { status: 'Phone screen',
          company: 'FAC',
          notes: 'Good candidate!!',
          author: 'Anita'
        },
      ];
      var status = statusHelper(notes)
      expect(status).to.equal('Phone screen at FAC');
      done();
  });
});
