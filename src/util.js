import Dockerode from 'dockerode'

export {Promise} from 'es6-promise'
export const dockerode = new Dockerode()
export const wait = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms))
