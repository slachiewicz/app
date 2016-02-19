module.exports = function(profile) {
  var result = profile;
  var expectedProperties = {
    url: '',
    connections: 0,
    connectedTo: [],
    fullname: '',
    location: '',
    favourite: [],
    current: '',
    picture: 'https://static.licdn.com/scds/common/u/images/themes/katy/ghosts/person/ghost_person_150x150_v1.png',
    summary: '',
    skills: [],
    languages: [],
    date: Date.now(),
    headline: '',
    notes: [],
    emails: [],
    contacts: {},
    experience: {}
  }

  var contacts = {
    email: '',
    phone: '',
    im: [],
    address: '',
    website: ''
  };

  var experience = {
    current: [],
    past: []
  };

  for(var prop in expectedProperties) {
    if(result[prop] === undefined) {
      result[prop] = expectedProperties[prop];
    }
  }
  for(var c in contacts) {
    if(result.contacts[c] === undefined) {
      result.contacts[c] = contacts[c];
    }
  }
  return result;
}
