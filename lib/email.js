var Joi = require('joi');
var sendEmail = require('./helpers/sendemail_gmail.js');

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

          return reply.view('email', {emails: emails, userProfile:userProfile});
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
        
        var candidateIds = request.payload.candidateID;
        var allEmails = [];
               
        if (typeof emailList === 'string') {
          allEmails.push(emailList);
        } else {
          allEmails = emailList;
        }

        var arrCandidateObj = [];
        var candidateObj = allEmails.reduce(function (newObj, value, iterator) {
          newObj = {email: value, id: candidateIds[iterator]}          
          return arrCandidateObj.push(newObj);
        }, {});
        
        console.log('candidateObj', candidateObj);
        console.log('----------------', arrCandidateObj);     

        var tokens = request.auth.credentials.tokens;
        sentEmail.subject = request.payload.subject;
        sentEmail.message = request.payload.message;
        sentEmail.senderName = request.auth.credentials.name.givenName;
        sentEmail.senderEmail = request.auth.credentials.emails[0].value;
        sentEmail.senderId = request.auth.credentials.id;
        // sentEmail.candidateID = request.payload.candidateID;
        // console.log('IDSSSSS',sentEmail.candidateID);
        var currentDate = new Date(); 
        sentEmail.sentAt = currentDate.getDate() + '-' + ("0" + (currentDate.getMonth() + 1)).slice(-2) + '-' + currentDate.getFullYear();

        console.log('sentEmail', sentEmail);

        var counter = 0;
        arrCandidateObj.forEach(function (obj) {
          // console.log('++++++obj', obj);

          sendEmail(obj.email, sentEmail, tokens, function (err, response) {

            if (err) {
              return reply('something went wrong');
            } 
            
            if (response.labelIds.indexOf('SENT') !== -1) {

              var emails = [];
              emails.push(sentEmail);
              // console.log('@@@@',sentEmail);

              client.update({
                index: process.env.ES_INDEX,
                type: process.env.ES_TYPE,
                id: obj.id,
                body: {
                  doc: {
                    emails: emails
                  }
                }

              }, function (elasticErr, elasticResponse) {
                console.log('elasticResponse', elasticResponse);
              })
            }

            counter++;
            if (counter === allEmails.length) {              
              return reply('ok');
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