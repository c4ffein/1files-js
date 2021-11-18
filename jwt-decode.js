/*
* jwt-decode.js
* Extracted from the https://github.com/auth0/jwt-decode/ build
*
* Made as 1-file, removed exposition through window logic but export instead, added comments, made shorter
*
* Initial license : https://github.com/auth0/jwt-decode/blob/master/LICENSE (MIT)
* davidchambers/Base64.js license : https://github.com/davidchambers/Base64.js/blob/master/LICENSE (WTFPL)
* Source with modifications : https://github.com/c4ffein/1files-js/LICENSE (MIT)
*/


/* The code was extracted from: https://github.com/davidchambers/Base64.js */
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function InvalidCharacterError(message) { this.message = message; }

InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = "InvalidCharacterError";

function polyfill(input) {
  var str = String(input).replace(/=+$/, "");
  if (str.length % 4 == 1) {
    throw new InvalidCharacterError( "'atob' failed: The string to be decoded is not correctly encoded." );
  }
  for (
    var bc = 0, bs, buffer, idx = 0, output = ""; // initialize result and counters
    (buffer = str.charAt(idx++)); // get next character
    // character found in table? initialize bit storage and add its ascii value;
    ~buffer && (
      (bs = bc % 4 ? bs * 64 + buffer : buffer),
      bc++ % 4  // and if not first of each 4 characters, convert the first 8 bits to one ascii character
    ) ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6)))) : 0
  ) { buffer = chars.indexOf(buffer); }  // try to find character in table (0-63, not found => -1)
  return output;
}
/* End of code extracted from Base64.js */


var atob = (typeof window !== "undefined" && window.atob && window.atob.bind(window)) || polyfill;

function b64DecodeUnicode(str) {
  // See https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem
  return decodeURIComponent(
    atob(str).replace(/(.)/g, function(m, p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) code = "0" + code;
      return "%" + code;
    })
  );
}

function base64_url_decode(str) {
  var output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0: break;
    case 2: output += "=="; break;
    case 3: output += "="; break;
    default: throw "Illegal base64url string!";
  }
  try { return b64DecodeUnicode(output); }
  catch (err) { return atob(output); }
}

function InvalidTokenError(message) {
  this.message = message;
}

InvalidTokenError.prototype = new Error();
InvalidTokenError.prototype.name = "InvalidTokenError";

function jwtDecode(token, options) {
  if (typeof token !== "string") { throw new InvalidTokenError("Invalid token specified"); }
  options = options || {};
  var pos = options.header === true ? 0 : 1;
  try { return JSON.parse(base64_url_decode(token.split(".")[pos])); }
  catch (e) { throw new InvalidTokenError("Invalid token specified: " + e.message); }
}

export default jwtDecode;
