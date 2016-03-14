import Container from './container'

export default class ContainerFactory {

  /**
   * Creates a container from the object.
   * @param {string} id The id
   * @param {string} name The name
   * @param {string} imageId The image id
   * @param {string} image The image
   */
  createFromObject({id, name, image}) {

    return new Container(id, name, image, null)

  }

  /**
   * Creates a container from the given name.
   * @param {string} name The name of the container
   */
  createFromName(name) {

    return new Container(null, name, null, null, null)

  }

}
