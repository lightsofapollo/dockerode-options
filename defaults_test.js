var path = require('path');
var Buffer = require('buffer').Buffer;

describe('defaults test', function() {
  var defaults = require('./');
  var assert = require('assert');

  // ensure DOCKER_HOST is not defined
  delete process.env.DOCKER_HOST;
  afterEach(function() {
    // and make sure none of the tests leak it either
    delete process.env.DOCKER_HOST;
    delete process.env.DOCKER_CERT_PATH;
  });

  it('should not overide options if given', function() {
    var input = { host: 'x' };
    assert.deepEqual(
      defaults(input),
      input
    );
  });

  it('should try to detect DOCKER_HOST', function() {
    process.env.DOCKER_HOST = '127.0.0.1:4243';
    assert.deepEqual(
      // null should convert into a real value
      defaults(null),
      { host: 'http://127.0.0.1', port: 4243 }
    );
  });

  it('should fallback to socket path', function() {
    assert.deepEqual(
      // null should convert into a real value
      defaults(),
      { socketPath: '/var/run/docker.sock' }
    );
  });

  it('should read certificates from DOCKER_CERT_PATH', function() {
    process.env.DOCKER_CERT_PATH = path.resolve(__dirname, 'examples/certs');

    assert.deepEqual(
      // null should convert into a real value
      defaults(null),
      {
        socketPath: '/var/run/docker.sock',
        ca: new Buffer('ca.pem\n', 'utf-8'),
        cert: new Buffer('cert.pem\n', 'utf-8'),
        key: new Buffer('key.pem\n', 'utf-8')
      }
    );
  });
});
