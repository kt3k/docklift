import ContainerAction from './container-action'
import ContainerCreate from './container-create'
import ContainerGet from './container-get'
import Task from './task'

export default class TaskBuilder {

  constructor(taskName) {

    this.task = new Task(taskName)
    this.currentAction = new ContainerAction()
    this.task.addContainerAction(this.currentAction)

  }

  /**
   * @return {Task}
   */
  getTask() {

    return this.task

  }

  /**
   * @param {Function} action The action of the container
   */
  addAction(action) {

    if (!this.currentAction.hasContainer()) {

      throw Error('First you need to select your container for the task: ' + this.task.name)

    }

    return this.currentAction.addAction(action)

  }

  /**
   * Add container get entry(ies).
   * @param {string|string[]} names The name(s) of the container(s)
   */
  containerGet(names) {

    if (names instanceof Array) {

      this.containerGetMulti(names)

    } else {

      this.containerGetSingle(names)

    }

  }

  /**
   * Add container get entry.
   * @param {string} name The name of the container
   */
  containerGetSingle(name) {

    this.currentAction.addContainerObtain(new ContainerGet(name))

  }

  /**
   * Add container get entries.
   * @param {string[]} names The names of containers
   */
  containerGetMulti(names) {

    names.forEach(name => this.addContainerGetSingle(name))

  }

  /**
   * Adds container create entry.
   * @param {object|object[]} params The params of the container creations
   */
  containerCreate(params) {

    if (params instanceof Array) {

      this.containerCreateMulti(params)

    } else {

      this.containerCreateSingle(params)

    }

  }

  /**
   * Adds container create entry.
   * @param {object|object[]} params The params of the container creation
   */
  containerCreateSingle(params) {

    this.currentAction.addContainerObtain(new ContainerCreate(params))

  }

  /**
   * Adds container create entries.
   * @param {object|object[]} params The params of the container creations
   */
  containerCreateMulti(params) {

    params.forEach(params => this.containerCreateSingle(params))

  }

}
