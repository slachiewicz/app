var sortByLevelSkill = require('../lib/helpers/sort_by_level_skill.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('sort array from the highest to lowest level of skills', function () {

  it('return arr sorted by highest level of skills', function (done) {

      var arr = [
        { level: 12,
          skill: 'CSS'        
        },
        { level: 45,
          skill: 'Javascript'         
        },
        { level: 19,
          skill: 'Java'         
        },
        { level: 0,
          skill: 'Python'         
        }
      ];

    
      var sortedArr = sortByLevelSkill(arr);
      expect(sortedArr[0].level).to.equal(45);
      done();
  });
});

describe('sort array from the highest to lowest level of skills', function () {

  it('return arr sorted by highest level of skills', function (done) {

      var arr = [
        { level: 12,
          skill: 'CSS'        
        },
        { level: 45,
          skill: 'Javascript'         
        },
        { level: 19,
          skill: 'Java'         
        },
        { level: 0,
          skill: 'Python'         
        }
      ];

    
      var sortedArr = sortByLevelSkill(arr);
      expect(sortedArr[0].level).to.not.be.equal(12);
      done();
  });
});