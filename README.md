# docklift v0.1.1 (WIP)

> Docker's Scripting Interface (not working yet)

# Install

    npm install docklift

# How to use

docklift.babel.js

```js
import {task, Container} from 'docklift'

const MYSQL_CTR = 'mysql-container-' + process.env.MYSQL_PORT
const ctr = Container.ofName(MYSQL_CTR)

task('start-mysql-container', () => {

  await ctr.run()

})

task('kill-mysql-container', () => {

  if (ctr.isRunning()) {

    await ctr.stop()

  }

  if (ctr.exists()) {

    await ctr.remove()

  }

})
```

Then, invoke the script with `docklift` command

    docklift start-mysql-container

The above command automatically find the `docklift.js` and executes the command in it. In this case it starts the container of the given name.

# Name

`docklift` lifts up the ability of `docker` by its scripting power.

# License

MIT
