var path = require('path');
var fs = require('fs');

var parse = require('./parse');

// default docker path on linux
var DEFAULT_SOCKET_PATH = '/var/run/docker.sock';

/**
Attempts to find reasonable defaults when connecting to a docker host if none
are given.

@param {Object|String|Null} options for dockerode.
@return {Object} docker options.
*/
function defaults(options) {
  if (typeof options === 'object' && options !== null) {
    return options;
  }

  if (typeof options === 'string') {
    options = parse(options);
  } else if (process.env.DOCKER_HOST) {
    // DOCKER_HOST is used generally when there is a remote host (like on OSX)
    options = parse(process.env.DOCKER_HOST);
  } else {
    options = { socketPath: DEFAULT_SOCKET_PATH };
  }

  if (process.env.DOCKER_CERT_PATH) {
    options.ca = fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'ca.pem'));
    options.cert = fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'cert.pem'));
    options.key = fs.readFileSync(path.join(process.env.DOCKER_CERT_PATH, 'key.pem'));
  }

  return options;
}

module.exports = defaults;
