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
 * @param {Array<string>} taskNames The task names
 * @param {Function} cb The callback
 */
export function start(taskNames, cb) {

  return orchestrator.start(...taskNames, cb)

}

/**
 * True iff there's no task defined.
 */
export function isEmpty() {

  return Object.keys(orchestrator.tasks).length === 0

}
