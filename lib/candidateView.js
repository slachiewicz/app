var es = require('./es.js');
var statusHelper = require('./helpers/generateStatus.js');
var getBlacklistCompanies = require('./helpers/get_blacklist_companies');
var blacklist = require('./helpers/blacklist.js');
var lastEmailDate = require('./helpers/last_email_date.js');
var jobList = require('./database-helpers/elasticsearch/list_jobs.js');

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/candidate/{id}/{keywords?}',
    config: {
      description: 'return the candidate detailed view page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
         return reply.redirect('/login');
        }
        else {
          var myId = request.auth.credentials.id;

          es.get({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,
            id: request.params.id.toString()
          }, function (error, response) {
            if(!response.found) {
              return reply.view('404').code(404);
            }
            var listFavourite = response._source.favourite;

            response._source.firstName = response._source.fullname.split(' ')[0];

            response._source.favourite = false;
            if(listFavourite.indexOf(myId) !== -1) {
              response._source.favourite = true;
            }
              response._source.id = response._id;

              if (request.params.keywords) {
                response._source.keywords = decodeURIComponent(request.params.keywords);
              } else {
                response._source.keywords = '';
              }
              response._source.status = statusHelper(response._source.notes);
              // avoid having an connectedTo null by setting an empty list:
              response._source.connectedTo = response._source.connectedTo || [];
              response._source.notes.reverse();
              var emails = response._source.emails || [];
              response._source.emails = emails;
              response._source.lastEmail = lastEmailDate(emails);

              
              var jobApplications = response._source.jobApplications || [];
              

              jobList(function (errorJobs,jobs) {

                jobApplications.forEach(function (application) {
                  var timestamp = new Date(application.timestamp);        
                  application.date = timestamp.getDate() + '-' + ("0" + (timestamp.getMonth() + 1)).slice(-2) + '-' + timestamp.getFullYear();
                  var job = jobs.filter(function(job) {
                    return application.jobID === job.id;
                  });
                  application.jobTitle = job[0] ? job[0].title : '';  
                });

                getBlacklistCompanies(function(error, clientList){
                  blacklist(response._source, clientList);
                  return reply.view('candidateView', response._source);
                });
              });             
          });
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'candidateView'
};
