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

  Hackpad.prototype.get = function(path, callback) {
    this.request(path, 'GET', callback);
  };

  Hackpad.prototype.request = function(path, method, callback) {
    var self = this;

    this.client.request(method, path, {}, function(err, response) {
      if(err) return callback(err);

      var data = JSON.parse(response);

      if(data.error) {
        callback(data.error);
      } else {
        callback(null, data);
      }
    });
  };

  Hackpad.prototype.listPads = function(callback) {
    this.get('/pads/all', callback);
  };

  Hackpad.prototype.revisionsFor = function(padId, callback) {
    this.get('/pad/'+padId+'/revisions', callback);
  };

  return Hackpad;

})();

module.exports = Hackpad;
