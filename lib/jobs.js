var getListJobs = require('./handlers/jobs/get_list.js');
var getCreate = require('./handlers/jobs/get_create.js');
var postCreate = require('./handlers/jobs/post_create.js');

exports.register = function (server, option, next) {

  server.route([
    {
      method: 'GET',
      path: '/jobs/list',
      config: {
        description: 'Get all the jobs',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getListJobs
      }
    },
    {
      method: 'GET',
      path: '/jobs/create',
      config: {
        description: 'Return create job page',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getCreate
      }
    },
    {
      method: 'POST',
      path: '/jobs/create',
      config: {
        description: 'create a job',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: postCreate
      }
    }

  ]);
  return next();
}

exports.register.attributes = {
  name: 'Job'
}
