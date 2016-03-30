'use strict';
var google       = require('googleapis');
var OAuth2       = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

var Joi = require('joi');
// var sendEmail = require('./helpers/sendemail_gmail.js');
const sendEmail = require('./helpers/email/send_email');
var candidatesEmailId = require('./helpers/candidates_email_id.js');
var client = require('./es.js');
var capitalizeFirstLetter = require('./helpers/email/capitalize_first_letter.js');
var generateSignature = require('./helpers/email/generate_signature');

exports.register = function (server, options, next) {

  server.route([
  {
    method: 'POST',
    path: '/email',
    config: {
      description: 'create email from the selected profiles',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        }

        var schema = {
          email: Joi.required()
        }

        var validationObject = Joi.validate(request.payload, schema, { abortEarly: false, allowUnknown: true });

        if (!validationObject.error) {
          var userProfile = {};

          var emailList = request.payload.email;
          var emails =[];

          if (typeof emailList === 'string') {
             emails.push(JSON.parse(emailList));
          } else {
             emailList.forEach(function (obj) {
              var parsed = JSON.parse(obj);
              emails.push(parsed);
            });
          }

          userProfile.firstname = JSON.parse(process.env.MAP_ID_USER)[request.auth.credentials.id];

          userProfile.image = request.auth.credentials.image.url;

          client.get({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE_USERS,
            id: request.auth.credentials.id
          }, function (err, response) {

            var user = response._source;
            var userObject = {
              fn: user.names.fullname,
              role: user.role,
              office: user.phones.office,
              mobile: user.phones.mobile,
              linkedin: user.linkedin
            }
            var signature = generateSignature(userObject);
            return reply.view('email', {emails: emails, userProfile:userProfile, user:user, signature: signature, pathUrl: request.payload.pathUrl});
          });
        }else {
          return reply.redirect('/');
        }

      }
    }

  },
  {
    method: 'POST',
    path: '/sendemail',
    config: {
      description: 'send the email to the profiles',
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

        //sent to just one profile -> create the array
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

        //data for the user signature
        var user = {};
        user.fn = request.payload.fn;
        user.role = request.payload.role;
        user.office = request.payload.office;
        user.mobile = request.payload.mobile;
        user.linkedin = request.payload.linkedin;

        //create an array of profiles for the email [{ email: emailOfTheProfile, id: idOfTheProfile, firstName: firstNameProfile },...]
        var arrCandidateObj = candidatesEmailId(allEmails, allCandidatesIDs, candidatesFirstNames);
        //profile of the user who sent the emails
        var profile = request.auth.credentials;
        //create common data of each emails
        sentEmail.subject = request.payload.subject;
        sentEmail.message = request.payload.message;
        sentEmail.senderName = JSON.parse(process.env.MAP_ID_USER)[request.auth.credentials.id];
        sentEmail.senderEmail = request.auth.credentials.emails[0].value;
        sentEmail.senderId = request.auth.credentials.id;
        sentEmail.timestamp = new Date().getTime();
        var currentDate = new Date();
        sentEmail.sentAt = currentDate.getDate() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + currentDate.getFullYear();

        //authenticate to use gmail api

        oauth2Client.setCredentials(profile.tokens);
        //sent email for each profiles
        var counter = 0;
        arrCandidateObj.forEach(function (obj) {

          sendEmail(obj, sentEmail, oauth2Client, user, function (err, response) {

            if (err) {
              console.log(err);
              return reply.redirect('/login');
            }

            //if the email is sent, updat the emails property of the profiles by adding the new email to the list
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
            //redirect to the profile or the home page
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
