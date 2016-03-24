var Handlebars = require('handlebars');

module.exports = function (skillValues) {

  var skills = skillValues.split(',').filter(Boolean);
  
  var list = [
  'Android',
  'SDK',
  'C',
  'C++',
  'CSS',
  'Eclipse',
  'HTML',
  'Java',
  'Javascript',
  'Node.JS',
  'PERL',
  'PHP',
  'Python',
  'COCOA',
  'IOS',
  'MySQL',
  'NoSQL',
  'Objective-C',
  'R',
  'RoR',
  'Ruby',
  'SQL',
  'Xcode',
  'Angular.js',
  'Backbones.js',
  'CSS3',
  'html5',
  'Node.js',
  'Campaign Management',
  'Copywriting',
  'Data',
  'EMail Campaign',
  'Facebook',
  'LinkedIn',
  'Marketing',
  'SEO',
  'Social Media',
  'Twitter',
  'JIRA',
  'Manual Testing',
  'TEST AUTOMATION',
  'Adobe',
  'Photoshop',
  'UI',
  'UX',
  'UI/UX',
  'Wireframes'
];

  var result = '';
  list.forEach(function (item) {

    if(skills.indexOf(item) > -1) {

      result +=  "<option value='" + item +"' selected >" + item + "</option>";

    } else {

      result +=  "<option value='" + item +"'>" + item + "</option>";
    }
  })
  return new Handlebars.SafeString(result);
};
