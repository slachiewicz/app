'use strict';

/**
 * replace {name} in a string by the firstName
 */
const capitalizeFirstLetter = require('./capitalize_first_letter.js');

const foundName = function (msg, obj) {

   var result = '';
   return result = msg.replace(/{name}/g, capitalizeFirstLetter(obj.firstName));
}

module.exports = foundName;
