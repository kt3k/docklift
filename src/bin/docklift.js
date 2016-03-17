import Liftoff from 'liftoff'
import {jsVariants} from 'interpret'
import chalk from 'chalk'
import minimist from 'minimist'

// creates a liftoff instance
const liftoff = new Liftoff({
  name: 'docklift',
  configName: 'docklift',
  extensions: jsVariants
})

// shows a message when requiring docklift.js
.on('require', function (name) {
  console.log('Requiring external module', chalk.magenta(name))
})

// shows a message when failed to require docklift.js
.on('requireFail', function (name) {
  console.error('Failed to load external module', chalk.magenta(name))
})

main(minimist(process.argv.slice(2)))

/**
 * The entry point of the cli.
 * @param {object} argv The command line arguments (parsed by `minimist`)
 */
function main(argv) {

  // invokes the liftoff app
  liftoff.launch({cwd: argv.cwd, configPath: argv.docklift, modulePath: argv.modulePath}, (env) => onLaunch(env, argv._))

}

/**
 * The handler of launching of `liftoff`.
 * @param {string} modulePath The local docklift module path
 * @param {string} configPath The user's docklift file path
 */
function onLaunch({modulePath, configPath}, commands) {

  if (!modulePath) {

    console.log(chalk.red('Error: Local docklift module not found'))
    console.log('Try running:', chalk.green('npm install docklift'))

    process.exit(1)

  }

  if (!configPath) {

    console.log(chalk.red('Error: No docklift file found'))

    process.exit(1)

  }

  console.log('Using docklift file:', chalk.magenta(configPath))

  // The shared docklift module which stores all the information the user creates
  const docklift = require(modulePath)

  // executes the user's docklift.js
  require(configPath)

  if (docklift.isEmpty()) {

    console.log(chalk.red(`Error: No task defined in: ${configPath}`))
    process.exit(1)

  }

  if (commands.length === 0) {

    console.log(chalk.red(`Error: No task specified`))
    console.log(chalk.red(`Usage: docklift task-name`))
    process.exit(1)

  }

  docklift.start(commands, err => {

    if (err) {

      console.log(chalk.red(err.stack))

    } else {

      console.log(chalk.green('Done'))

    }

  })

}
