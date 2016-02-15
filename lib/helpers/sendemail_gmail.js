var google       = require('googleapis');
var gmail        = google.gmail('v1');
var OAuth2       = google.auth.OAuth2;
var oauth2Client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
var btoa         = require('btoa'); // encode email string to base64
var Handlebars   = require('handlebars');
/**
 * sendEmail abstracts the complexity of sending an email via the GMail API
 * @param {Object} options - it is your sent email, which include:
 *   - {String} message - the message you want to send
 *   - {String} subject - the subject you want to send
 *   - {String} senderName - sender name
 *   - {String} senderEmail - sender email
 * @param {Object} email - the candidate email
 * @param {Object} tokens - the list of tokens returned after Google OAuth
 * @param {Function} callback - gets called once the message has been sent
 *   your callback should accept two arguments:
 *   @arg {Object} error - the error returned by the GMail API
 *   @arg {Object} response - response sent by GMail API
 */
module.exports = function sendEmail(email, options, tokens, callback) {
  // var template = Handlebars.compile(options.payload.message);
  // var message  = template(options.payload);
  oauth2Client.setCredentials(tokens);
  var senderEmail = options.senderEmail;
  var name = options.senderName;
 
  var base64EncodedEmail = btoa( // encode email "envelope"
    "Content-Type:  text/html; charset=\"UTF-8\"\n" +
    "Content-length: 5000\n" +
    "Content-Transfer-Encoding: message/rfc2822\n" +
    "to: " + email + "\n" +
    "from: \"" + name + "\" <"+ senderEmail +">\n" +
    //  "from: nodecoder@gmail.com \n" +
    "subject:" + options.subject + "\n\n" +
    // "This message was sent by <b>Node.js</b>!"
    '<table width="auto"> <tr><td>' +
    options.message +
    '</td> </tr></table>' + "\n\n" +
     '<table> <tr><td>' +
    'Kindest Regards ' + '<br/>' + name +
    '</td> </tr></table>'
      ).replace(/\+/g, '-').replace(/\//g, '_');
  // see: http://stackoverflow.com/questions/30590988/failed-sending-mail-through-google-api-with-javascript
  var params = { 
    userId: 'me',
    auth: oauth2Client,
    resource: { //  nested object
      raw: base64EncodedEmail
    }};

    gmail.users.messages.send(params, callback);

}