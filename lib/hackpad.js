var oauth = require('oauth-client');
var querystring = require('querystring');
var _ = require('underscore');

var Hackpad = (function() {

  function Hackpad(key, secret, options) {
    options = options || {};

    var consumer = oauth.createConsumer(key, secret);
    this.signer = oauth.createHmac(consumer);

    if(typeof options['site'] != 'undefined') {
      this.host = options['site']
      if(this.host.indexOf('.') == -1) this.host += '.hackpad.com';
    } else {
      this.host = 'hackpad.com';
    }
  };

  Hackpad.prototype.request = function(path, method, headers, body, callback) {
    var self = this;
    callback = callback || function() {};

    if(typeof body == "function") {
      callback = body;
      body = null;
    }

    var request = {
      port: 443,
      host: this.host,
      https: true,
      path: '/api/1.0' + path,
      oauth_signature: this.signer,
      method: method,
      headers: {
        'Content-Length': body ? body.length : 0
      }
    };

    request.headers = _.extend(request.headers, headers);

    console.log(request);

    var req = oauth.request(request, function(responseObj) {
      var response = '';
      responseObj.on('data', function(chunk) { response += chunk; });
      responseObj.on('end', function () {
        if(responseObj.headers['content-type'].indexOf('application/json') !== -1) {
          var data = JSON.parse(response);

          if(data.error) {
            callback(data.error);
          } else {
            callback(null, data);
          }
        } else {
          callback(null, response);
        }
      });
    });

    req.on('error', callback);
    if(body) req.write(body);
    req.end();
  };

  Hackpad.prototype.get = function(path, callback) {
    this.request(path, 'GET', {}, null, callback);
  };

  Hackpad.prototype.post = function(path, headers, body, callback) {
    this.request(path, 'POST', headers, body, callback);
  };

  Hackpad.prototype.create = function(body, contentType, callback) {
    if(typeof contentType === "function") {
      callback = contentType;
      contentType = null;
    }

    var headers = { 'Content-Type': contentType || 'text/html' };

    this.post('/pad/create', headers, body, callback);
  };

  Hackpad.prototype.import = function(padId, body, contentType, callback) {
    if(typeof contentType === "function") {
      callback = contentType;
      contentType = null;
    }

    var headers = { 'Content-Type': contentType || 'text/html' };

    this.post('/pad/'+padId+'/content', headers, body, callback);
  };

  Hackpad.prototype.revert = function(padId, revisionId, callback) {
    this.post('/pad/'+padId+'/revert-to/'+revisionId, {}, null, callback);
  };

  Hackpad.prototype.export = function(padId, revisionId, format, callback) {
    revisionId = revisionId || 'latest';
    format = format || 'html';
    this.get('/pad/'+padId+'/content/'+revisionId+'.'+format, callback);
  };

  Hackpad.prototype.editedSince = function(timestamp, callback) {
    if(typeof timestamp === "object") {
      timestamp = +timestamp;
    }

    this.get('/edited-since/'+timestamp, callback);
  };

  Hackpad.prototype.revisions = function(padId, callback) {
    this.get('/pad/'+padId+'/revisions', callback);
  };

  Hackpad.prototype.revokeAccess = function(padId, email, callback) {
    this.post('/pad/'+padId+'/revoke-access/'+email, {}, null, callback);
  };

  Hackpad.prototype.removeUser = function(email, callback) {
    this.post('/user/'+email+'/remove', {}, null, callback);
  };

  Hackpad.prototype.setEmailEnabled = function(email, setting, callback) {
    if(setting !== false && setting !== true) {
      return callback("Please specify true or false");
    }

    setting = setting == false ? "false" : "true";

    this.post('/user/'+email+'/settings?send-email='+setting, {}, null, callback);
  };

  Hackpad.prototype.search = function(terms, start, limit, callback) {
    if(typeof start == "function") { callback=start; start=null; }
    if(typeof limit == "function") { callback=limit; limit=null; }

    var query = { q: terms };
    if(start) query.start = start;
    if(limit) query.limit = limit;

    var queryString = querystring.stringify(query);

    this.get('/search?'+queryString, callback);
  };

  Hackpad.prototype.list = function(callback) {
    this.get('/pads/all', callback);
  };

  return Hackpad;

})();

module.exports = Hackpad;
