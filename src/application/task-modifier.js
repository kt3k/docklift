import Orchestrator from 'orchestrator'
import TaskBuilder from './task-builder'

export const orchestrator = new Orchestrator()

/**
 * Creates a task of the given name and dependencies.
 *
 * @param {string} taskName The task name
 * @param {string|string[]} deps (The list of) the dependency task names
 */
export function createTask(taskName, deps) {

  const builder = new TaskBuilder(taskName)

  orchestrator.add(taskName, deps, () => builder.getTask().execute())

  const modifier = {

    /**
     * Adds the behavior of the action.
     * @param {Function} action The behavior o the action
     */
    do(action) {

      builder.addAction(action)

      return modifier

    },

    /**
     * @return {object}
     */
    get container() {

      return modifier

    },

    /**
     * Adds the way of getting a container
     * @param {string|string[]} names The names of the containers
     */
    get(names) {

      builder.containerGet(names)

      return modifier

    },

    /**
     * Adds the way of creating a container
     * @param {object|object[]} names The names of the containers
     */
    create(params) {

      builder.containerCreate(params)

      return modifier

    }

  }

  return modifier

}
