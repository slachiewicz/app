var completeList = require('../lib/helpers/list_searched_skills.js');
var exist = require('../lib/helpers/exist_obj.js');
var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Code.expect;
var it = lab.test;

describe('complete list of searched four skills', function () {

  it('return array of 4 searched skills', function (done) {

      var searchedSkills = ['css', 'javascript', 'python', 'java'];

      var contactSkills = [{level: 12, skill: 'css'}, {level: 10, skill: 'python'}, {level: 0, skill: 'java'}, {level: 33, skill: 'javascript'}, {level: 99, skill: 'agile'}, {level: 9, skill: 'meteor'} ]
    
      var list = completeList(searchedSkills, contactSkills);
      expect(list.length).to.equal(4);
      done();
  });
});

describe('complete list of four skills if you search for two skills', function () {

  it('return array of 4 skills', function (done) {

      var searchedSkills = ['css', 'javascript'];
   
      var contactSkills = [{level: 12, skill: 'css'}, {level: 10, skill: 'python'}, {level: 0, skill: 'java'}, {level: 33, skill: 'javascript'}, {level: 99, skill: 'agile'}, {level: 9, skill: 'meteor'} ]
    
      var list = completeList(searchedSkills, contactSkills);
      expect(list.length).to.equal(4);
      done();
  });
});

describe('empty list of searched skill if candidate have no skills', function () {

  it('return empty array', function (done) {

      var searchedSkills = ['css', 'javascript'];
   
      var contactSkills = [];
    
      var list = completeList(searchedSkills, contactSkills);
      expect(list.length).to.equal(0);
      done();
  });
});

describe('check if the object exist in the complete list of searched skills', function () {

  it('return true if the object exist in the complete list of skills', function (done) {

      var searchedSkills = ['css', 'javascript'];
   
      var contactSkills = [{level: 12, skill: 'css'}, {level: 10, skill: 'python'}, {level: 0, skill: 'java'}, {level: 33, skill: 'javascript'}];
    
      var list = completeList(searchedSkills, contactSkills);

      expect(exist({level: 12, skill: 'css'}, list)).to.equal(true);
      done();
  });
});

describe('check if the object exist in the complete list of searched skills', function () {

  it('return false if the object not exist in the complete list of skills', function (done) {

      var searchedSkills = ['css', 'javascript'];
      
      var contactSkills = [{level: 12, skill: 'css'}, {level: 10, skill: 'python'}, {level: 0, skill: 'java'}, {level: 33, skill: 'javascript'}, {level: 33, skill: 'cooking'}];
    
      var list = completeList(searchedSkills, contactSkills);

      //our list is sorted by the higest level of skill this is why java will not appear in our complete list because is the lowest level 
      expect(exist({level: 0, skill: 'java'}, list)).to.equal(false);
      done();
  });
});