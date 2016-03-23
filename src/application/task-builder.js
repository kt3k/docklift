import ContainerAction from './container-action'
import ContainerCreate from './container-create'
import ContainerGet from './container-get'
import Task from './task'

/**
 * The builder of the task. Registers container/action pairs to the task object.
 */
export default class TaskBuilder {

  constructor(taskName) {

    this.task = new Task(taskName)

    this.startBuildingNewAction()

  }

  /**
   * @return {Task}
   */
  getTask() {

    return this.task

  }

  /**
   * Starts building a new contaienr action.
   */
  startBuildingNewAction() {

    this.currentAction = new ContainerAction()
    this.task.addContainerAction(this.currentAction)

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
   * @param {object} param The parameters for getting containers
   */
  containerGet(names, params) {

    if (this.currentAction.readyToGo()) {

      this.startBuildingNewAction()

    }

    if (names instanceof Array) {

      this.containerGetMulti(names, params)

    } else {

      this.containerGetSingle(names, params)

    }

  }

  /**
   * Add container get entry.
   * @param {string} name The name of the container
   * @param {object} param The parameters for getting containers
   */
  containerGetSingle(name, params) {

    this.currentAction.addContainerObtain(new ContainerGet(name, params))

  }

  /**
   * Add container get entries.
   * @param {string[]} names The names of containers
   * @param {object} param The parameters for getting containers
   */
  containerGetMulti(names, params) {

    names.forEach(name => this.addContainerGetSingle(name, params))

  }

  /**
   * Adds container create entry.
   * @param {object|object[]} params The params of the container creations
   */
  containerCreate(params) {

    if (this.currentAction.readyToGo()) {

      this.startBuildingNewAction()

    }

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
