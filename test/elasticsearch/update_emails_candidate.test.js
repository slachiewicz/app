'use strict';

require('env2')('.env');
const Code = require('code');
const Lab = require('lab');
const updateEmailsCandidate = require('../../lib/database-helpers/elasticsearch/update_emails_candidate');

const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const expect = Code.expect;
const it = lab.test;

const es = require('../../lib/es.js');
const candidateEmails = {  fullname: "Candidate update emails test", emails: [] };
const candidateWithoutEmails = {  fullname: "Candidate no emails" };
const email = { subject: 'subject of the email',
                message: 'The message of the email',
                senderName: 'The name of the sender',
                senderId: 'idSender',
                timestamp: 12345,
                sentAt: '23'
              };

describe('Update the emails property of a candidate', function () {

  it('update the property emails of a candidate', function (done) {

    //save a new candidate
    es.index({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: 99,
      body: candidateEmails
    }, function(errorIndex, responseIndex) {
      //wait for the document to be indexed and update the emails property
      setTimeout(function(){
        updateEmailsCandidate(99, email, function(errorUpdate, responseUpdate){
          //get the candidate and check the value of the property emails
            es.get({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: 99,
              _source: ['emails'],
            }, function(errorGet, candidate){
                expect(candidate._source.emails.length).to.equal(1);
                expect(candidate._source.emails[0].subject).to.equal('subject of the email');

                //delete the fake candidate
                es.delete({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: 99
                }, function(errorDelete, responseDelete) {

                  done();
                })
            })
        })
      }, 2000);

    })
  });
});

describe('Update the emails property of a candidate with no emails yet', function () {

  it('update the property emails of a candidate with no emails yet', function (done) {

    //save a new candidate
    es.index({
      index: process.env.ES_INDEX,
      type: process.env.ES_TYPE,
      id: 100,
      body: candidateWithoutEmails
    }, function(errorIndex, responseIndex) {
      //wait for the document to be indexed and update the emails property
      setTimeout(function(){
        updateEmailsCandidate(100, email, function(errorUpdate, responseUpdate){
          //get the candidate and check the value of the property emails
            es.get({
              index: process.env.ES_INDEX,
              type: process.env.ES_TYPE,
              id: 100,
              _source: ['emails'],
            }, function(errorGet, candidate){
                expect(candidate._source.emails.length).to.equal(1);
                expect(candidate._source.emails[0].subject).to.equal('subject of the email');

                //delete the fake candidate
                es.delete({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: 100
                }, function(errorDelete, responseDelete) {

                  done();
                })
            })
        })
      }, 2000);

    })
  });
});
