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

    this.container = new ContainerFactory().createFromDslObject(obj)

  }

  /**
   * Obtains the container.
   * @return {Promise<Container>}
   */
  obtain() {

    return new ContainerRepository().save(this.container)

  }

  /**
   * Creates an instance
   * @param {object} createOpts The container create options
   */
  static createOne(createOpts, params) {

    return new ContainerCreate(createOpts)

  }

}
