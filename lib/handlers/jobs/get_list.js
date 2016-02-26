module.exports = function (request, reply) {
  if (!request.auth.isAuthenticated) {
    return reply.redirect('/login').code(401);
  }
  else {
    return reply.view('jobs');
  }
}