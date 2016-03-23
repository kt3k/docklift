import ContainerRepository from '../domain/container-repository'
import ContainerObtain from './container-obtain'

/**
 * Container getting DSL model.
 */
export default class ContainerGet extends ContainerObtain {

  /**
   * @param {string} name The name of container
   * @param {boolean} [quiet=false] If true then does not throw error when container not found, otherwise throws
   */
  constructor(name, {quiet} = {}) {

    super()

    this.containerName = name
    this.quiet = quiet || false

  }

  /**
   * Obtains the container.
   * @return {Promise<Container>}
   */
  obtain() {

    return new ContainerRepository().getByName(this.containerName).then(container => {

      if (container == null && !this.quiet) {

        throw new Error('Cannot get container of the name: ' + this.containerName)

      }

      return container

    })

  }

}
