import Container from './container'

export default class ContainerFactory {

  /**
   * Creates a container from the given name.
   * @param {string} name The name of the container
   */
  createFromName(name) {

    return new Container({name})

  }

}
