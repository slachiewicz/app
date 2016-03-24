const getListJobs = require('./handlers/jobs/get_list.js');
const getCreate = require('./handlers/jobs/get_create.js');
const postCreate = require('./handlers/jobs/post_create.js');
const getDetailedJob = require('./handlers/jobs/get_detailed_job.js');
const getJobForm = require('./handlers/jobs/get_job_form')

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
      method: 'GET',
      path: '/jobs/{id}',
      config: {
        description: 'Return a detailed job page',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getDetailedJob
      }
    },

    {
      method: 'GET',
      path: '/jobs/edit/{id}',
      config: {
        description: 'return a edit job page',
        auth: {
          mode: 'try',
          strategy: 'jwt'
        },
        handler: getJobForm
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
