import util from 'util'
import chalk from 'chalk'

/**
 * The facade class for the container model. This class adds the logging to each action of the container model.
 */
export default class ContainerLoggingService {

  /**
   * @param {Container} container The container
   */
  constructor(container) {

    this.container = container

  }

  /**
   * Logs the message.
   * @private
   * @param {string[]} messages The messages
   */
  log(...messages) {

    if (!this.quiet) {

      console.log(...messages)

    }

  }

  /**
   * Starts the container.
   * @return {Promise<ContainerLoggingService>}
   */
  start() {

    this.log('Starting the container:', this.inspectContainer())

    return this.container.start().then(() => this)

  }

  /**
   * Stops the container.
   * @return {Promise<ContainerLoggingService>}
   */
  stop() {

    this.log('Stopping the container:', this.inspectContainer())

    return this.container.stop().then(() => this)

  }

  /**
   * Removes the container.
   * @return {Promise<ContainerLoggingService>}
   */
  remove() {

    this.log('Removing the container:', this.inspectContainer())

    return this.container.remove().then(() => this)

  }

  /**
   * Returns pretty printed container string.
   * @param {Container} container The container
   * @return {string}
   */
  inspectContainer() {

    return chalk.green(util.inspect({
      name: this.container.name,
      image: this.container.image,
      cmd: this.container.cmd
    }))

  }

}
