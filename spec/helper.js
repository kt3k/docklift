import ContainerFactory from '../src/domain/container-factory'
import ContainerRepository from '../src/domain/container-repository'

it.skipOnCI = (desc, func) => {

  return process.env.CI === 'true' ? it.skip(desc, func) : it(desc, func)

}

export const containerFactory = new ContainerFactory()
export const containerRepository = new ContainerRepository()

/**
 * Generates a random number < n.
 * @param {number} [n=65536] The upper limit of the random numbers
 * @return {number}
 */
export const dice = (n = 65536) => Math.floor(Math.random() * n)
