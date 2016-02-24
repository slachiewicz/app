var Joi = require('joi');
var sendEmail = require('./helpers/sendemail_gmail.js');
var candidatesEmailId = require('./helpers/candidates_email_id.js');
var client = require('./es.js');

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

          return reply.view('email', {emails: emails, userProfile:userProfile, pathUrl: request.payload.pathUrl});
        }
        return reply.redirect('/');
      }
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
        var candidateIds = request.payload.candidateID;
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

        var arrCandidateObj = candidatesEmailId(allEmails, allCandidatesIDs);
        var profile = request.auth.credentials;
        sentEmail.subject = request.payload.subject;
        sentEmail.message = request.payload.message;
        sentEmail.senderName = request.auth.credentials.name.givenName;
        sentEmail.senderEmail = request.auth.credentials.emails[0].value;
        sentEmail.senderId = request.auth.credentials.id;
        sentEmail.timestamp = new Date().getTime();
        var currentDate = new Date();
        sentEmail.sentAt = currentDate.getDate() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + currentDate.getFullYear();

        var counter = 0;
        arrCandidateObj.forEach(function (obj) {

          sendEmail(obj.email, sentEmail, profile, function (err, response) {

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
                  currentEmail.push(sentEmail);

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
              return reply.redirect(request.payload.pathUrl);
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
