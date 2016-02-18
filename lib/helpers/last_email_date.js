module.exports = function (emails) {
  var result = {};

  if (emails.length > 0) {
    emails.reverse();
    result.sentAt = emails[0].sentAt;
    result.timestamp = emails[0].timestamp;
  }

  return result;
}