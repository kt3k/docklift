import {Promise} from '../util'
import ContainerRepository from '../domain/container-repository'

const repository = new ContainerRepository()

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

    container = factory.createFromObject(container)

    if (container.isCreatable()) {

      return repository.save(container)

    }

    if (container.hasName()) {

      return repository.getByName(container.name)

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

      return promise.then(() => this.applyActionToContainers(action))

    }, Promise.resolve()))

  }

  /**
   * @param {Array<string>} containers The list of containers to add
   */
  addContainers(containers) {

    this.containers.push(...containers)

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
