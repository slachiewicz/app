var existObj = require('../lib/helpers/exist_obj.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;


describe('existnace of the object in array with the same skill', function () {

  it('return true if obj with the same skill is in arr', function (done) {

      //the last item of the array is the most recent
      var arr = [
        { level: 12,
          skill: 'CSS'        
        },
        { level: 0,
          skill: 'Javascript'         
        }
      ];

      var obj = {
        level: 12,
        skill: 'Css'        
        };

      var exist = existObj(obj, arr);
      expect(exist).to.equal(true);
      done();
  });
});

describe('existnace of the object in array with the same skill', function () {

  it('return false if obj with the same skill is not in arr', function (done) {

      //the last item of the array is the most recent
      var arr = [
        { level: 12,
          skill: 'CSS'        
        },
        { level: 0,
          skill: 'Javascript'         
        }
      ];

      var obj = {
        level: 12,
        skill: 'Python'        
        };

      var exist = existObj(obj, arr);
      expect(exist).to.equal(false);
      done();
  });
});
