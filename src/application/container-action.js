import {Promise} from '../util'
import ContainerRepository from '../domain/container-repository'
import ContainerFactory from '../domain/container-factory'
import Container from '../domain/container'

const repository = new ContainerRepository()
const factory = new ContainerFactory()

export default class ContainerAction {

  constructor() {

    /**
     * @property {Array<string>} containers The list of the of the containers
     */
    this.containers = []

    /**
     * @property {Array<Function>} actions The list of actions
     */
    this.actions = []

  }

  /**
   * @return {Promise<Array<Container>>}
   */
  getContainerModels() {

    return Promise.all(this.containers.map(ContainerAction.getContainerModel))
      .then(containerModels => this.containerModels = containerModels)

  }

  /**
   * @param {any} container
   */
  static getContainerModel(container) {

    if (typeof container === 'string') {

      const containerNameOrId = container

      return repository.getById(containerNameOrId)

    }

    if (!(typeof container === 'object')) {

      throw new Error('Unable to create container from: ' + container)

    }

    container = new Container(container)

    if (container.isCreatable()) {

      return repository.save(container)

    }

    if (container.hasName()) {

      return repository.getByName(container.name).then(container0 => {

        if (container0 == null) {

          throw new Error(`The container does not exist: ${container.name}`)

        }

        return container0
      })

    }

    throw new Error('Unable to handle container: ' + JSON.stringify(container))

  }

  /**
   * @param {Function} action The behavior of the action
   */
  applyActionToContainerModels(action) {

    return Promise.all(this.containerModels.map(containerModel => action(containerModel)))

  }

  /**
   * Executes the action on the containers.
   * @return {Promise}
   */
  execute() {

    return this.getContainerModels().then(() => this.actions.reduce((promise, action) => {

      return promise.then(() => this.applyActionToContainerModels(action))

    }, Promise.resolve()))

  }

  /**
   * @param {any} container The something which represents a container
   */
  addContainer(container) {

    this.containers.push(container)

  }

  /**
   * @param {Function} action The action
   */
  addAction(action) {

    this.actions.push(action)

  }

  /**
   * Returns true if the action has any container, false otherwise.
   * @return {boolean}
   */
  hasContainer() {

    return this.containers.length > 0

  }

  /**
   * Returns true if the action has any action (behavior), false otherwise.
   * @return {boolean}
   */
  hasAction() {

    return this.actions.length > 0

  }

}
