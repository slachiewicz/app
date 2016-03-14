'use strict'

/*
* function which take a profile and add a property clientProfile to true if the current property of the profile is a client
*/

let blacklist = function(profile, clientList) {

  profile.clientProfile = false;
  //lower case the list of companies
  // let list = clientList.map(client => {return client.toLowerCase()} );
  // if(list.indexOf(profile.current.toLowerCase()) !== -1) {
  //   profile.clientProfile = true;
  // } else {
  //   list.forEach(function(client) {
  //     if(profile.current.toLowerCase().indexOf(client) !== -1) {
  //       profile.clientProfile = true;
  //     }
  //   })
  // }
  return profile;
}

module.exports = blacklist;
