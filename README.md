dockerode-options
=================

Can both parse string based options (like 127.0.0.1:4243) for dockerode and find sensible defaults for connecting to docker.


## Usage


### With a string

```js
var dockerOpts = require('dockerode-options');
var Docker = require('dockerode');

// DOCKER_HOST = '127.0.0.1:4243'
var options = dockerOpts(process.env.DOCKER_HOST);
// => { host: 'http://127.0.0.1', port: 4243 }

// these can now be used to start dockerode
var docker = new Docker(options);
```


### With no options

```js
var dockerOpts = require('dockerode-options');
var options = dockerOpts();
// => { socketPath: '/var/run/docker.sock' }
```

### With DOCKER_HOST environment variable set

```js
var dockerOpts = require('dockerode-options');

process.env.DOCKER_HOST = '127.0.0.1:60022';

var options = dockerOpts();
// => { host: '127.0.0.1', port: 60022  };
```

### With DOCKER_CERT_PATH environment variable set

```js
var dockerOpts = require('dockerode-options');

process.env.DOCKER_CERT_PATH = '/home/certs';

var options = dockerOpts();
// => { ca: <contents of /home/certs/ca.pem>, cert: <contents of /home/certs/cert.pem>, key: <contents of /home/certs/key.pem>  };
```
