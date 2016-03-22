'use strict';

const clientES = require('../../es.js');
const listJobs = require('../../database-helpers/elasticsearch/list_jobs');

module.exports = function (request, reply) {

  if (!request.auth.isAuthenticated) {
    return reply.redirect('login');
  }

  var accept = request.headers.accept.split(',');
  console.log('get', accept);
  listJobs(function(err, response) {

    if(accept.indexOf('application/json') !== -1) {
      return reply(response);

     } else {

      return reply.view('jobs', {result: response})
    }
  })

}



//     var numberJobs = 0;
//
//     clientES.search({
//       index: process.env.ES_INDEX,
//       type: process.env.ES_TYPE_JOBS,
//       scroll: '30s',
//       search_type: 'scan',
//       size: 1000,
//       body: {
//         query: {
//           match_all: {},
//         },
//         sort: { "dateAdded": {"order": "desc"}}
//       }
//     }, function getMoreUntilDone(error, response) {
//
//       var result = [];
//
//       response.hits.hits.forEach(function (job) {
//         result.push(job._source);
//         numberJobs += 1;
//       });
//
//       if (response.hits.total !== numberJobs) {
//         clientES.scroll({
//           scrollId: response._scroll_id,
//           scroll: '30s',
//           size: 1000,
//         }, getMoreUntilDone);
//       } else {
//
//         if(accept.indexOf('application/json') !== -1) {
//           return reply(result);
//
//          } else {
//           return reply.view('jobs', {result: result})
//         }
//       }
//     });
//   }
// }
