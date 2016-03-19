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

task('start-my-container')
.container({name: 'my-container', image: 'my-container-image'})
.do(container => {

  return container.start({port: process.env.MY_PORT + ':3306'})

})

task('kill-my-container')
.container({name: 'my-container'})
.do(container => {

  return container.stop().then(() => container.remove())

})
```

Then, invoke `docklift` command

    ./node_modules/.bin/docklift start-my-container

The above command automatically find the `docklift.js` and executes the command in it. In this case it starts the container of the given name.

    ./node_modules/.bin/docklift kill-my-container

The above kills and removes the container of the same name `my-container-XXXX`

# API

```
import {task} from 'docklift'
```

## task(taskName)

- @param {string} taskName The task name to register
- @return {TaskModifier}

Creates and registers a task of the given name. Returns task modifier and you can define your own container actions in the task.

## task(taskName).container({name, image})

- @param {string} name The name of the container
- @param {string} image The image of the container (necessary only when creating container)

The defines the container your work on in this task.

## task(taskName).container({name, image}).do(action)

- @param {Function} action The action to perform

`do` method defines what action is performed on the containers in the task.

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
