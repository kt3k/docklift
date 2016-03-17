import {Promise} from '../util'

/**
 * The task represents a unit task in docklift.
 */
export default class Task {

  /**
   * @param {string} name The task name
   */
  constructor(name) {

    this.name = name
    this.actions = []

  }

  /**
   * @param {ContainerAction} action The container action
   */
  addContainerAction(action) {

    this.actions.push(action)

  }

  execute() {

    return this.actions.reduce((promise, action) => {

      return promise.then(() => action.execute())

    }, Promise.resolve())

  }

}
