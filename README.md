# docklift v0.4.0

> Manage your docker containers from JavaScript

# Install

    npm install docklift

optionally (if you want to use es2015)

    npm install babel-register babel-preset-es2015

# How to use

First create `docklift.babel.js` file like the following:

```js
import {task} from 'docklift'

const MY_CONTAINER_NAME = 'my-container-name'

task('start-my-container').container({name: MY_CONTAINER_NAME})(container => {

  return container.start({port: process.env.MY_PORT + ':3306'})

})

task('kill-my-container').container({name: MY_CONTAINER_NAME})(container => {

  return container.stop().then(() => container.remove())

})
```

Then, invoke `docklift` command

    ./node_modules/.bin/docklift start-my-container

The above command automatically find the `docklift.js` and executes the command in it. In this case it starts the container of the given name.

    ./node_modules/.bin/docklift kill-my-container

The above kills and removes the container of the same name `my-container-XXXX`

# License

MIT

# Name

`docklift` is a tool which lifts up the ability of `docker` by its scripting capability.
