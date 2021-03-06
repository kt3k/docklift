import {dockerode} from '../util'
import ContainerRepository from './container-repository'

/**
 * The container model.
 */
export default class Container {

  /**
   * @param {string} id The id
   * @param {string} name The name of the container
   * @param {string} image The name of the image
   * @param {string} cmd The command of the image
   * @param {boolean} isRunning true if it's running, false otherwise.
   * @param {Array<string>} ports The port bindings
   */
  constructor({id, name, image, cmd, isRunning, ports}) {

    this.id = id
    this.name = name
    this.image = image
    this.cmd = cmd
    this.isRunning = isRunning
    this.isRemoved = false
    this.ports = ports

  }

  /**
   * Gets the same container from docker and update itself.
   * @private
   * @return {Promise<Container>}
   */
  update() {

    return new ContainerRepository().getById(this.id).then(container => {

      this.id = container.id
      this.image = container.image
      this.name = container.name
      this.cmd = container.cmd
      this.isRunning = container.isRunning
      this.ports = container.ports

      return this

    })

  }

  /**
   * Starts the container and returns the promise of itself.
   * @return {Promise<Container>}
   */
  start() {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(this.id).start(err => {

        if (err) {

          return reject(err)

        }

        return resolve()

      })

    }).then(() => this.update())

  }

  /**
   * Stops the container and returns the promise of itself.
   * @return {Promise}
   */
  stop() {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(this.id).stop(err => {

        if (err) {

          return reject(err)

        }

        return resolve()

      })

    }).then(() => this.update(), err => {

      if (err.statusCode === 304) { // The container is already stopped
        return
      }

      throw err

    })

  }

  /**
   * Removes the container.
   * @return {Promise}
   */
  remove() {

    return new ContainerRepository().remove(this)

  }

  /**
   * Returns true iff the container has the id.
   */
  hasId() {

    return this.id != null

  }

  /**
   * Sets the state of the container removed
   */
  setRemoved() {

    this.id = null
    this.isRunning = false
    this.isRemoved = true

  }

}
