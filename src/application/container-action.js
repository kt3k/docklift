import {Promise} from '../util'
import ContainerRepository from '../domain/container-repository'
import Container from '../domain/container'

const repository = new ContainerRepository()

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
   * @return {Promise<Container[]>}
   */
  getContainers() {

    return Promise.all(this.obtains.map(obtain => obtain.obtain()))

  }

  /**
   * Applies the action on the given containers.
   * @param {Function} action The behavior of the action
   * @param {Container[]} containers The containers
   */
  applyActionToContainers(action, containers) {

    return Promise.all(containers.map(container => action(container)))

  }

  /**
   * Executes the action on the containers.
   * @return {Promise}
   */
  execute() {

    return this.getContainers().then(containers => this.actions.reduce((promise, action) => {

      return promise.then(() => this.applyActionToContainers(action, containers))

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

}
