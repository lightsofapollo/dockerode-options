var URL = require('url');

// default protocol to use if none is present.
var DEFAULT_PROTOCOL = 'http:';

/**
This module parses passed DOCKER_HOST

$PORT:HOST string

```js
parse('127.0.0.1:4243');
// => { host: 'http://127.0.0.1', port: 4243 }

parse('/magic/path');
// => { socketPath: '/magic/path' }
```

@param {String} url for connection.
@return {Object} proper url for modem.
*/
function parse(url) {
  // if it starts with a slash its a path
  if (url[0] === '/') return { socketPath: url };

  // default docker url bail if there is a protocol so special case support.
  if (url.indexOf('://') === -1) {
    url = DEFAULT_PROTOCOL + '//' + url;
  }

  var parsed = URL.parse(url);

  // docker in docker uses tcp:// to indicate a docker host. Remap this to http
  if (parsed.protocol.indexOf('http') !== 0) {
    parsed.protocol = DEFAULT_PROTOCOL;
  }

  return {
    host: parsed.protocol + '//' + parsed.hostname,
    port: parseInt(parsed.port, 10)
  };
}

module.exports = parse;

