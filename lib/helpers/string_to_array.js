'use strict';

const stringToArray = function(element) {

  return typeof element === 'string' ? [element] : element
}

module.exports =stringToArray;
