'use strict';

var google       = require('googleapis');
var gmail        = google.gmail('v1');
// var OAuth2       = google.auth.OAuth2;
// var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
var btoa         = require('btoa'); // encode email string to base64
var Handlebars   = require('handlebars');

var generateSignature = require('./generate_signature.js');
const foundName = require('./found_name');

/**
 * sendEmail abstracts the complexity of sending an email via the GMail API
 * @param {Object} options - it is your sent email, which include:
 *   - {String} message - the message you want to send
 *   - {String} subject - the subject you want to send
 *   - {String} senderName - sender name
 *   - {String} senderEmail - sender email
 * @param {Object} obj - the candidate obj which include: email, id, firstName
 * @param {Object} profile - the list of tokens returned after Google OAuth
 * @param {Function} callback - gets called once the message has been sent
 *   your callback should accept two arguments:
 *   @arg {Object} error - the error returned by the GMail API
 *   @arg {Object} response - response sent by GMail API
 */
module.exports = function sendEmail(obj, options, oauth, user, callback) {

  var senderEmail = options.senderEmail;
  var message = options.message.replace(/\n/g, '<br/>');
  var name = options.senderName;
  var signature = generateSignature(user);


  var base64EncodedEmail = btoa(
    "Content-Type:  text/html; charset=\"UTF-8\"\n" +
    "Content-length: 5000\n" +
    "Content-Transfer-Encoding: message/rfc2822\n" +
    "to: " + obj.email + "\n" +
    "from: \"" + name + "\" <"+ senderEmail +">\n" +
    "subject:" + foundName(options.subject, obj) + "\n\n" +
    '<p>' +
    foundName(message, obj) +
    '</p>' + '</br>' +
    signature
  ).replace(/\+/g, '-').replace(/\//g, '_');

  // see: http://stackoverflow.com/questions/30590988/failed-sending-mail-through-google-api-with-javascriptr
  var params = {
    userId: 'me',
    auth: oauth,
    resource: {
      raw: base64EncodedEmail
    }};

    gmail.users.messages.send(params, callback);

}
