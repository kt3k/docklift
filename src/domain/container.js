import dockerode from '../dockerode'

/**
 * The container model.
 */
export default class Container {

  /**
   * @param {string} id The id
   * @param {string} imageId The id of the image
   * @param {string} name The name of the container
   * @param {boolean} isRunning true if it's running, false otherwise.
   */
  constructor(id, imageId, name, isRunning) {

    this.id = id
    this.imageId = imageId
    this.name = name
    this.isRunning = isRunning

  }

  /**
   * Starts the container.
   *
   * @return {Promise}
   */
  start() {

    dockerode

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

    return new ConainerRepository().remove(this)

  }

}
