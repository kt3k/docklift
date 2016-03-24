import {Promise} from '../util'
import ContainerLoggingService from './container-logging-service'

/**
 * The pair of the list of the ways of obtaining containers and the list of actions on them.
 */
export default class ContainerAction {

  constructor() {

    /**
     * @property {ContainerObtain[]} obtains The list of the ways of obtaining containers
     */
    this.obtains = []

    /**
     * @property {Function[]} actions The list of actions
     */
    this.actions = []

  }

  /**
   * Gets the actual containers from the obtaining models.
   * @return {Promise<ContainerLoggingService[]>}
   */
  getContainers() {

    return Promise.all(this.obtains.map(obtain => obtain.obtain())).then(containers =>
      containers
      .filter(container => container != null)
      .map(container => this.createLoggingService(container))
    )

  }

  /**
   * Creates the container logging service.
   * @param {Container} container The container
   * @return {ContainerLoggingService}
   */
  createLoggingService(container) {
    return new ContainerLoggingService(container)
  }

  /**
   * Executes the action on the containers.
   * @return {Promise}
   */
  execute() {

    return this.getContainers().then(containers => this.actions.reduce((promise, action) => {

      return promise.then(() => Promise.all(containers.map(action)))

    }, Promise.resolve()))

  }

  /**
   * Registers the action on containers.
   * @param {Function} action The action
   */
  addAction(action) {

    this.actions.push(action)

  }

  /**
   * Registers the way of obtaining a container.
   * @param {ContainerObtain} obtain The way of obtaining a container
   */
  addContainerObtain(obtain) {

    this.obtains.push(obtain)

  }

  /**
   * Returns true if the action has any container, false otherwise.
   * @return {boolean}
   */
  hasContainer() {

    return this.obtains.length > 0

  }

  /**
   * Returns true if the action has any action (behavior), false otherwise.
   * @return {boolean}
   */
  hasAction() {

    return this.actions.length > 0

  }

  /**
   * Returns true iff the action is ready to execute.
   * @return {boolean}
   */
  readyToGo() {

    return this.hasAction() && this.hasContainer()

  }

}
