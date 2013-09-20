#Overview
A client library for the Hackpad API (Version 1.0)

Make sure to check out the official [Hackpad API documentation](https://hackpad.com/Hackpad-API-v1.0-k9bpcEeOo2Q).

#Requirements

[oauth-client](https://github.com/unscene/node-oauth)

[underscore](http://underscorejs.org/)

(Sorry about the underscore req. It's just for an object merge, and I'll definitely
accept a pull request that eliminates the need for it).

#Installation
Clone from here, or install with npm:

    npm install hackpad

Include in your app:

    var Hackpad = require('hackpad');

#Usage

Instantiate the client with your Hackpad Oauth client ID and secret (You can find them on your [account page](https://hackpad.com/ep/account/)).

    var client = new Hackpad(client_id, secret, [options]);

Then, just run commands on your fancy new client:

    client.create("This is an awesome hackpad");

All methods accept a [callback] function in the usual format:

    client.create("I like this hackpad even more", function(err, result) {
      if(err) { return console.log("Oh crap!"); }
      // do something...
    });

JSON responses are parsed automatically for you, so this would work:

    client.create("I should stop creating new hackpads", function(err, resp) {
      console.log(resp.padId);
    });

For non-JSON responses (just `export` at this point), the raw body is returned.

## Options

An optional options dictionary can be passed to the client.

`site` custom site (e.g., "mycompany" if your Hackpad site is mycompany.hackpad.com)

## Methods

This client supports all the API endpoints described in the [Hackpad API documentation](https://hackpad.com/Hackpad-API-v1.0-k9bpcEeOo2Q). Details:

### create
    client.create(body, format, [callback])

`body` a string of body text

`format` 'text/html', 'text/x-web-markdown', 'text/plain' (default 'text/html')

### import
    client.import(padId, body, format, [callback])

`padId` ID of an existing (or not-existing) pad

`body` a string of body text

`format` 'text/html', 'text/x-web-markdown', 'text/plain' (default: 'text/html')

### revert
    client.revert(padId, revisionId, [callback])

### export
    client.export(padId, format, [callback])

`padId` ID of an existing pad

`format` 'html', 'md', 'txt' (default: 'html')

### editedSince
    client.editedSince(timestamp, [callback])

`padId` ID of an existing pad

`timestamp` Accepts either a unix timestamp (int) or a Date object

### revisions
    client.revisions(padId, [callback])

`padId` ID of an existing pad

### revokeAccess
    client.revokeAccess(email, [callback])

`email` Email address of the user to revoke access for

### removeUser
    client.removeUser(email, [callback])

`email` Email address of the user to remove

### setEmailEnabled
    client.setEmailEnabled(email, setting, [callback])

`email` Email address of the user to update

`setting` true or false

### search
    client.search(term, [start], [limit], [callback])

`terms` Search terms

`start` Offset to start from

`limit` How many results to return

### list
    client.list([callback])

# Tests
Currently no tests. I am ashamed. Please feel free to write some!

# License

(The MIT License)

Copyright (c) 2013 Lou Kosak &lt;lkosak [at] gmail [dot] com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
