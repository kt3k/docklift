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
   * Checks and updates the current action.
   */
  checkAndUpdateCurrentAction() {

    if (this.currentAction.readyToGo()) {

      this.startBuildingNewAction()

    }

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

    this.checkAndUpdateCurrentAction()

    ContainerGet.create(names, params).forEach(get => this.currentAction.addContainerObtain(get))

  }


  /**
   * Adds container create entry.
   * @param {object|object[]} params The params of the container creations
   */
  containerCreate(params) {

    this.checkAndUpdateCurrentAction()

    ContainerCreate.create(params).forEach(create => this.currentAction.addContainerObtain(create))

  }

}
