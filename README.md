# docklift v0.1.1 (WIP)

> Docker's Scripting Interface (not working yet)

# Install

    npm install docklift

# How to use

First, create `docklift.babel.js` file like the following:

```js
import {task} from 'docklift'

const MY_CONTAINER_NAME = 'my-container-' + process.env.MY_PORT

task('start-my-container').container({name: MY_CONTAINER_NAME})(container => {

  return container.start({port: '3306:3306'})

})

task('kill-my-container').container({name: MY_CONTAINER_NAME})(container => {

  return container.stop().then(() => container.remove())

})
```

Then, invoke the script with `docklift` command

    docklift start-my-container

The above command automatically find the `docklift.js` and executes the command in it. In this case it starts the container of the given name.

# Name

`docklift` lifts up the ability of `docker` by its scripting power.

# License

MIT
