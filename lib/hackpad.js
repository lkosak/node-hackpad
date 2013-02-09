var oauth = require('client-oauth');

var Hackpad = (function() {

  Hackpad.prototype.base_path = '/api/1.0';

  function Hackpad(key, secret) {
    var consumer = new oauth[1.0]({
      base: 'https://hackpad.com/api/1.0',
      key: key,
      secret: secret
    });

    this.client = consumer.Client();
  };

  Hackpad.prototype.request = function(path, method, data, callback) {
    var self = this;

    if(typeof data == "function") {
      callback = data;
      data = null;
    }

    this.client.request(method, path, data, function(err, response) {
      if(err) return callback(err);

      var data = JSON.parse(response);

      if(data.error) {
        callback(data.error);
      } else {
        callback(null, data);
      }
    });
  };

  Hackpad.prototype.get = function(path, callback) {
    this.request(path, 'GET', callback);
  };

  Hackpad.prototype.post = function(path, body, callback) {
    this.request(path, 'GET', data, callback);
  };

  Hackpad.prototype.create = function(body, callback) {
    this.post('/pad/create', body, callback);
  };

  Hackpad.prototype.import = function(padId, body, callback) {
    this.post('/pad/'+padId+'/import', body, callback);
  };

  Hackpad.prototype.revert = function(padId, revisionId, callback) {
    this.post('/pad/'+padId+'/content/revert-to/'+revisionId, callback);
  };

  Hackpad.prototype.export = function(padId, revisionId, format, callback) {
    revisionId = revisionId || 'latest';
    format = format || 'html';
    this.get('/pad/'+padId+'/content/'+revisionId+'?format='+format, callback);
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
    this.post('/pad/'+padId+'/revoke-access/'+email, callback);
  };

  Hackpad.prototype.removeUser = function(email, callback) {
    this.post('/user/'+email+'/remove', callback);
  };

  Hackpad.prototype.sendEmail = function(email, setting, callback) {
    if(setting !== false && setting !== true) {
      return callback("Please specify true or false");
    }

    setting = setting == false ? "false" : "true";

    this.post('/user/'+email+'/settings?send-email='+setting, callback);
  };

  Hackpad.prototype.list = function(terms, start, limit, callback) {
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
