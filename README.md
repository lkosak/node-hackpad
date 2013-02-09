#Overview
A client library for the Hackpad API (Version 1.0)

Make sure to check out the official [Hackpad API documentation](https://hackpad.com/Hackpad-API-v1.0-k9bpcEeOo2Q).

#Installation
Clone from here, or install with npm:
    npm install hackpad
Include in your app:
    var Hackpad = require('hackpad')

#Usage

Instantiate the client with your Hackpad Oauth client ID and secret (You can find them on your [account page](https://hackpad.com/ep/account/).
    var client = new Hackpad(<client_id>, <secret>)

Then, just run commands on your fancy new client:
    client.create("This is an awesome hackpad");

All methods accept a [callback] function in the usual format:
    function(err, result) {}

JSON responses are parsed automatically for you, so this would work:
    client.create("I should stop creating new hackpads", function(err, resp) {
      doSomethingWith(resp.padId);
    });

For non-JSON responses (just `export` at this point), the raw body is returned.

## Methods

This client supports all the API endpoints described in the [Hackpad API documentation](https://hackpad.com/Hackpad-API-v1.0-k9bpcEeOo2Q). Details:

### create
    client.create(body, format, [callback])

`body`: a string of body text
`format`: 'text/html', 'text/x-web-markdown', 'text/plain' (default 'text/html')

### import
    client.import(padId, body, format, [callback])

`padId`: ID of an existing (or not-existing) pad
`body`: a string of body text
`format`: 'text/html', 'text/x-web-markdown', 'text/plain' (default: 'text/html')

### revert
    client.revert(padId, revisionId, [callback])

### export
    client.export(padId, format, [callback])

`padId`: ID of an existing pad
`format`: 'html', 'md', 'txt' (default: 'html')

### editedSince
    client.editedSince(timestamp, [callback])

`padId`: ID of an existing pad
`timestamp`: Accepts either a unix timestamp (int) or a Date object

### revisions
    client.revisions(padId, [callback])

`padId`: ID of an existing pad

### revokeAccess
    client.revokeAccess(email, [callback])

`email`: Email address of the user to revoke access for

### removeUser
    client.removeUser(email, [callback])

`email`: Email address of the user to remove

### setEmailEnabled
    client.setEmailEnabled(email, setting, [callback])

`email`: Email address of the user to update
`setting`: true or false

### search
    client.search(term, [start], [limit], [callback])

`terms`: Search terms
`start`: Offset to start from
`limit`: How many results to return

### list
    client.list([callback])
