import Orchestrator from 'orchestrator'
import TaskBuilder from './task-builder'

export const orchestrator = new Orchestrator()

/**
 * Creates a task of the given name and dependencies.
 *
 * @param {string} taskName The task name
 * @param {string|Array<string>} deps (The list of) the dependency task names
 */
export function createTask(taskName, deps) {


  const builder = new TaskBuilder(taskName)

  orchestrator.add(taskName, deps, () => builder.getTask().execute())

  /**
   * Adds the behavior of the action.
   * @param {Function} action The behavior o the action
   */
  const taskModifier = (action) => {

    builder.addAction(action)

    return taskModifier

  }

  /**
   * Adds the containers
   * @param {Array<string>|string} containers The ids of the containers to add
   */
  taskModifier.container = containers => {

    builder.addContainers(containers)

    return taskModifier

  }

  return taskModifier

}
