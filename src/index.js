import {createTask, orchestrator} from './application/task-modifier'

/*
 * @param {string} taskName The task name
 * @param {string|Array<string>} deps (The list of) the dependency task names
 */
export function task(taskName, deps) {

  return createTask(taskName, deps)

}

/**
 * Starts the task.
 *
 * @param {Array<string>} taskNames The task names
 */
export function start(...taskNames) {

  return orchestrator.start(...taskNames)

}
