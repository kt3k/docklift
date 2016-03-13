import Liftoff from 'liftoff'
import {jsVariants} from 'interpret'
import chalk from 'chalk'

// creates a liftoff instance
const docklift = new Liftoff({
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

main()

/**
 * The entry point of the cli.
 * @param {object} argv The command line arguments
 */
function main(argv = {}) {

  // invokes the liftoff app
  docklift.launch({cwd: argv.cwd, configPath: argv.docklift}, onLaunch)

}

/**
 * @param {string} modulePath The local docklift module path
 * @param {string} configPath The user docklift file path
 */
function onLaunch({modulePath, configPath}) {

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

  const docklift = require(modulePath)

  if (docklift.isEmpty()) {

    console.log(chalk.red('Error: No asset defined in bulbofile'))

    process.exit()

  }

}
