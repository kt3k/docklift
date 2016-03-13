import ContainerAction from './container-action'
import Task from './task'

export default class TaskBuilder {

  construtor(taskName) {

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
   * @param {Array<string>|string} containers The containers to add
   */
  addContainers(containers) {

    if (!(containers instanceof Array)) {

      containers = [containers]

    }

    this.containers.forEach(container => this.addContainer(container))

  }

  /**
   * Adds a container.
   * @param {string} container
   */
  addContainer(container) {

    if (this.currentAction.hasContainer() && this.currentAction.hasAction()) {

      // The current action is enough configured. Creates a new one.

      this.currentAction = new ContainerAction()

      this.task.addContainerAction(this.currentAction)

    }

    this.currentAction.addContainer(container)

  }

}
