# docklift v0.1.0

> Docker's Scripting Interface

# Install

    npm install docklift

# How to use

First, create `docklift.js` like the following:

```js
var docker = require('docklift').docker

var runningContainers = docker.ps()

var ctr = runningContainers[0]

docker.stop(ctr)
docker.rm(ctr)
```

Then, invoke the script with `docklift` command

    docklift

The above command automatically find the `docklift.js` and executes the command in it. In this case it stops and removes the first running container.

# License

MIT
