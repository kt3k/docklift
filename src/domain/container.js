import {dockerode} from '../util'
import ContainerRepository from './container-repository'

/**
 * The container model.
 */
export default class Container {

  /**
   * @param {string} id The id
   * @param {string} name The name of the container
   * @param {string} imageId The id of the image
   * @param {string} image The name of the image
   * @param {string} cmd The command of the image
   * @param {boolean} isRunning true if it's running, false otherwise.
   */
  constructor(id, name, image, cmd, isRunning) {

    this.id = id
    this.name = name
    this.image = image
    this.cmd = cmd
    this.isRunning = isRunning

  }

  /**
   * Starts the container.
   *
   * @return {Promise}
   */
  start() {

    return new Promise((resolve, reject) => {

      dockerode.getContainer(this.id).start((err, data) => {

        if (err) {

          reject(err)
          return

        }

        new ContainerRepository().getById(data.Id).then(container => {

          this.id = container.id
          this.image = container.image
          this.name = container.name
          this.cmd = container.cmd
          this.isRunning = container.isRunning

          resolve(this)

        })

      })

    })

  }

  /**
   * Stops the container.
   *
   * @return {Promise}
   */
  stop() {}

  /**
   * Removes the container.
   *
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
   * Returns true iff it has the image id.
   */
  hasImageId() {

    return this.imageId != null

  }

  /**
   * Returns true iff this container has enough properties for being created.
   */
  isCreatable() {

    return this.image != null

  }

}
