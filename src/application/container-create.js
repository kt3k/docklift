import ContainerFactory from '../domain/container-factory'
import ContainerRepository from '../domain/container-repository'
import ContainerObtain from './container-obtain'

/**
 * Container creating DSL model.
 */
export default class ContainerCreate extends ContainerObtain {

  /**
   * @param {object} obj The object represents container
   */
  constructor(obj) {

    super()

    console.log(obj)

    this.container = new ContainerFactory().createFromDslObject(obj)

    console.log(this.container)

  }

  /**
   * Obtains the container.
   * @return {Promise<Container>}
   */
  obtain() {

    return new ContainerRepository().save(this.container)

  }

}
