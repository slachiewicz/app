module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login');
  }
  else {
   
    var result = {};
    result.jobtitle = request.payload.jobTitle;
    result.description = request.payload.description; 
   

    return reply.redirect('/jobs/list');           
  }
}