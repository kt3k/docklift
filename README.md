# DockerScript v0.1.0

> Docker's Scripting Interface

# Install

    npm install dockerscript
    npm install -g dsi

# How to use

First, create `dockerscript.js` like the following:

```js
var docker = require('dockerscript')

var runningContainers = docker.ps()

var ctr = runningContainers[0]

docker.stop(ctr)
docker.rm(ctr)
```

Then, invoke the script with `dsi` command

    dsi

The above command automatically find the `dockerscript.js` and executes the command in it. In this case it stops and removes the first running container.

# License

MIT
