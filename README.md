# docklift v0.7.0 [![Circle CI](https://circleci.com/gh/kt3k/docklift.svg?style=svg)](https://circleci.com/gh/kt3k/docklift)

> Manage your docker containers from JavaScript

# Install

    npm install docklift

optionally (if you want to use es2015)

    npm install babel-register babel-preset-es2015

# How to use

First create `docklift.babel.js` file like the following:

```js
import {task} from 'docklift'

task('start-my-container')
.create({
  name: 'my-container',
  image: 'ubuntu',
  cmd: 'some-command',
  ports: [process.env.MY_HOST_PORT + ':3000']
})
.do(container => {

  return container.start()

})

task('kill-my-container')
.get('my-container', {quiet: true})
.do(container => {

  return container.remove()

})
```

Then, invoke `docklift` command

    ./node_modules/.bin/docklift start-my-container

The above command automatically find the `docklift.js` and executes the command in it. In this case it starts the container of the given name.

    ./node_modules/.bin/docklift kill-my-container

The above kills and removes the container of the same name `my-container-XXXX`

# API

```js
import {task} from 'docklift'
```

## task(taskName)

- @param {string} taskName The task name to register
- @return {TaskModifier}

Creates and registers a task of the given name. Returns task modifier and you can define your own container actions in the task.

## task().create({name, image, cmd, ports}[, ...]).do(action)

- @param {string} name The name of the container
- @param {string} image The image of the container (necessary only when creating container)
- @param {string} cmd The command
- @param {string|string[]} ports The port forwarding settings
- @param {Function} action The action to perform

Creates the container(s) and perform the action(s) on it.

## task().get(names).do(action)

- @param {string|string[]} names The names of the container to get
- @param {Function} action The action to perform

Gets the container(s) and perform the action(s) on it.

# Container class

## container.start()

- @return {Promise}

Starts the container.

## container.stop()

- @return {Promise}

Stops the container.

## container.remove()

- @return {Promise}

Removes the container.

# License

MIT

# Name

`docklift` is a tool which lifts up the ability of `docker` by its scripting capability.
