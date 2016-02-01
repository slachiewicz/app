var es = require('./es.js');
exports.register = function (server, option, next) {

  server.route({
    method: 'GET',
    path: '/dashboard/{fullname?}',
    config: {
      description: 'return user dashboard page',
      auth: {
        mode: 'try',
        strategy: 'jwt'
      },
      handler: function (request, reply) {

        if (!request.auth.isAuthenticated) {
          return reply.redirect('/login');
        } else {
          var fullname = request.auth.credentials.firstname;

          es.search({
            index: process.env.ES_INDEX,
            type: process.env.ES_TYPE,                      
            body: {
              query: {
                match:{
                  "notes.author": fullname
                }
              }              
            }
          }, function (error, response) {
            // if(!response.found) {
            //   return reply.view('404').code(404);
            // }
             
              var submitted = [];
              var phone_screen = [];
              var interview = [];
              var placement = [];

              response.hits.hits.forEach(function (profile) {
                var userProfile = profile._source;

                var note = userProfile.notes[userProfile.notes.length-1];

                if (note.author === fullname) {
                  if (note.status == 'submitted') {
                    submitted.push(userProfile);
                  }

                  if (note.status == 'phone-screen') {
                    phone_screen.push(userProfile);
                  }

                  if (note.status == 'interview') {
                    interview.push(userProfile);
                  }

                  if (note.status == 'placement') {
                    placement.push(userProfile);
                  }                
                }
  
                userProfile.currentStatus = note.status;
                                
              });

              return reply.view('dashboard', {
                user: fullname,
                submitted: submitted,
                phone_screen: phone_screen,
                interview: interview,
                placement: placement
              });
            });                                    
        }       
      }
    }
  });

  return next();
}

exports.register.attributes = {
  name: 'Dashboard'
};