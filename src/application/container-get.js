import ContainerRepository from '../domain/container-repository'
import ContainerObtain from './container-obtain'

/**
 * Container getting DSL model.
 */
export default class ContainerGet extends ContainerObtain {

  /**
   * @param {string} name The name of container
   */
  constructor(name) {

    super()

    this.containerName = name

  }

  /**
   * Obtains the container.
   * @return {Promise<Container>}
   */
  obtain() {

    return new ContainerRepository().getByName(this.containerName).then(container => {

      if (container == null) {

        throw new Error('Cannot get container of the name: ' + this.containerName)

      }

      return container

    })

  }

}
