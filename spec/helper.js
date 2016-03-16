import ContainerFactory from '../src/domain/container-factory'
import ContainerRepository from '../src/domain/container-repository'

export const containerFactory = new ContainerFactory()
export const containerRepository = new ContainerRepository()

/**
 * Generates a random number < n.
 * @param {number} n The upper limit of the random numbers
 * @return {number}
 */
export const dice = (n) => Math.floor(Math.random() * n)
