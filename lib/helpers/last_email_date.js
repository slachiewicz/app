module.exports = function (emails) {
  var result = {};

  if (emails.length > 0) {
    var lastEmail = emails.reverse();
    console.log(lastEmail[0]);
    result.sentAt = lastEmail[0].sentAt;
    result.timestamp = lastEmail[0].timestamp;
  }

  return result;
}