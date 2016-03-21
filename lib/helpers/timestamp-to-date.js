'use strict';

const timestampToDate = function (timestamp) {

  const date = new Date(timestamp);
  return date.getDate() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
}

module.exports = timestampToDate
