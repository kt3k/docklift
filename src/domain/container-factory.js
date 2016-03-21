import Container from './container'

export default class ContainerFactory {

  /**
   * Creates from DSL object.
   * @param {Object} obj The DSL object which represents a container.
   * @return {Container}
   */
  createFromDslObject(obj) {

    let ports

    if (typeof obj.ports === 'string') {

      // makes it singleton array
      obj.ports = [obj.ports]

    } else if (obj.ports instanceof Array) {

      // does nothing

    } else if (obj.ports == null) {

      // does nothing

    } else {

      throw new Error('ports are invalid: ' + ports)

    }

    return
  }

  /**
   * Creates a container from the given name.
   * @param {string} name The name of the container
   * @return {Container}
   */
  createFromName(name) {

    return new Container({name})

  }

}
