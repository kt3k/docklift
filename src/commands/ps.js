import {dockerode} from '../dockerode'
import {Promise} from 'es6-promise'

/**
 * List Containers.
 *
 * @param {boolean} all If true returns all containers, else returns only running containers. The default is false.
 */
export const ps = ({all} = {}) => {

  return new Promise((resolve, reject) => {

    dockerode.listContainers((err, containers) => {

      if (err) {

        reject(err)

        return

      }

      resolve(containers)

    })

  })

}
