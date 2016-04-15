'use strict';

var Joi = require('joi');
var sendEmail = require('./helpers/sendemail_gmail.js');
var candidatesEmailId = require('./helpers/candidates_email_id.js');
var client = require('./es.js');
var capitalizeFirstLetter = require('./helpers/capitalize_first_letter.js');
const getEmailForm = require('./handlers/email/get_email');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/email',
    config: {
      description: 'create email',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: getEmailForm
    }

  },
  {
    method: 'POST',
    path: '/sendemail',
    config: {
      description: 'send email',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        var sentEmail = {};
        var emailList = request.payload.to;

        var allCandidatesIDs = [];
        var candidatesFirstNames = [];
        var candidateIds = request.payload.candidateID;
        var candidateFirstName = request.payload.candidateFN;
        var allEmails = [];

        if (typeof emailList === 'string') {
          allEmails.push(emailList);
        } else {
          allEmails = emailList;
        }

        if (typeof candidateIds === 'string') {
          allCandidatesIDs.push(candidateIds);
        } else {
          allCandidatesIDs = candidateIds;
        }


        if (typeof candidateFirstName === 'string') {
          candidatesFirstNames.push(candidateFirstName);
        } else {
          candidatesFirstNames = candidateFirstName;
        }

        var user = {};
        user.fn = request.payload.fn;
        user.role = request.payload.role;
        user.office = request.payload.office;
        user.mobile = request.payload.mobile;
        user.linkedin = request.payload.linkedin;
        var arrCandidateObj = candidatesEmailId(allEmails, allCandidatesIDs, candidatesFirstNames);
        var profile = request.auth.credentials;
        sentEmail.subject = request.payload.subject;
        sentEmail.message = request.payload.message;
        sentEmail.senderName = JSON.parse(process.env.MAP_ID_USER)[request.auth.credentials.id];
        sentEmail.senderEmail = request.auth.credentials.emails[0].value;
        sentEmail.senderId = request.auth.credentials.id;
        sentEmail.timestamp = new Date().getTime();
        var currentDate = new Date();
        sentEmail.sentAt = currentDate.getDate() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + currentDate.getFullYear();

        var counter = 0;
        arrCandidateObj.forEach(function (obj) {


          sendEmail(obj, sentEmail, profile, user, function (err, response) {
            if (err) {
              console.log(err);
              //return reply('something went wrong');
              return reply.redirect('/login');

            }

            if (response.labelIds.indexOf('SENT') !== -1) {

              client.get({
                index: process.env.ES_INDEX,
                type: process.env.ES_TYPE,
                id: obj.id,
                _source: ['emails']

              }, function (errElastic, responseElastic) {
                if (errElastic) {
                  next(errElastic);
                }
                  var currentEmail = responseElastic._source.emails;
                  if (currentEmail === undefined) {
                    currentEmail = [];
                  }
                  //replace {name} with the real name
                  var emailObject = {};
                  emailObject.subject = sentEmail.subject;
                  emailObject.subject = emailObject.subject.replace(/{name}/g, capitalizeFirstLetter(obj.firstName));
                  emailObject.message = sentEmail.message;
                  emailObject.message = emailObject.message.replace(/{name}/g, capitalizeFirstLetter(obj.firstName));
                  emailObject.senderName = sentEmail.senderName;
                  emailObject.senderId = sentEmail.senderId;
                  emailObject.timestamp = sentEmail.timestamp;
                  emailObject.sentAt = sentEmail.sentAt;
                  currentEmail.push(emailObject);

                  client.update({
                  index: process.env.ES_INDEX,
                  type: process.env.ES_TYPE,
                  id: obj.id,
                  body: {
                    doc: {
                      emails: currentEmail
                    }
                  }

                }, function (elasticErr, elasticResponse) {
                  // console.log('elasticResponse', elasticResponse);
                })
              })

            }

            counter++;
            if (counter === allEmails.length) {
              if(request.payload.pathUrl){
                return reply.redirect(request.payload.pathUrl);
              }
              else {
                return reply.redirect('/');
              }
            }
          })
        })

      }
    }
  }
]);

  return next();
};

exports.register.attributes = {
  name: 'Email'
};
